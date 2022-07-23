import { forbiddenError, notFoundError } from "../Middlewares/errorHandler.js";
import { categoryRepository } from "../Repositories/categoriesRepository.js";
import { disciplineRepository } from "../Repositories/disciplinesRepository.js";
import { teacherRepository } from "../Repositories/teachersRepository.js";
import { termRepository } from "../Repositories/termRepository.js";
import { bodyTest, createTest, testRepository } from "../Repositories/testRepository.js";
import { groupBy } from "../Utils/groupUtils.js";

async function queryByDiscipline(){
    const query = await termRepository.queryByTerm();

    const disciplines = query.map( term => {
        return { 
            term: term.number,
            disciplines: term.Discipline.map( discipline =>{
                return {
                    name: discipline.name,
                    tests: discipline.TeachersDisciplines.map( test =>{
                        return test.Test.map(data =>{
                            return {
                                id: data.id,
                                name: data.name,
                                pdfUrl: data.pdfUrl,
                                category: data.category.name,
                                teacher: data.teacherDiscipline.teacher.name,
                                discipline: data.teacherDiscipline.discipline.name
                            }
                        })
                    }).flat(1)
                }
            })
        }  
    })

    disciplines.forEach(el => {
        el.disciplines.forEach(discipline => {
            discipline.tests = groupBy('category')(discipline.tests);
        });
    });

    return disciplines;
}

async function queryByTeacher() {
    const query = await teacherRepository.queryByTeacher();

    const teachers = query.map( teacher => { 
        return {
            id:teacher.id,
            name: teacher.name,
            tests: teacher.TeachersDisciplines.map( test =>{
                return test.Test.map(data =>{
                    return {
                        id: data.id,
                        name: data.name,
                        pdfUrl: data.pdfUrl,
                        category: data.category.name,
                        teacher: data.teacherDiscipline.teacher.name,
                        discipline: data.teacherDiscipline.discipline.name
                    }
                })
            }).flat(1)
        }
    })

    teachers.forEach(el => {
        el.tests = groupBy('category')(el.tests);
    });
    

    return teachers;
}

async function createTest(test:bodyTest) {
    const { name, pdfUrl, categoryId, teacherId, disciplineId } = test;

    const checkName = await testRepository.findTestName(name);
    if (checkName) throw forbiddenError("test name already in use");

    const checkCategory = await categoryRepository.findCategory(categoryId);
    if (!checkCategory) throw notFoundError("category not found");

    const checkTeacher = await teacherRepository.findTeacher(teacherId);
    if (!checkTeacher) throw notFoundError("teacher not found");

    const checkDiscipline = await disciplineRepository.findDiscipline(disciplineId);
    if (!checkDiscipline) throw notFoundError("discipline not found");

    const checkTeacherDiscipline = await teacherRepository.findTeacherDiscipline(teacherId,disciplineId);
    if (!checkTeacherDiscipline) throw notFoundError("Discipline/Teacher relation doesnt exist");
    
    const query = await testRepository.createTest({
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId:checkTeacherDiscipline.id
    });

    return query;
}

export const testServices = {
    queryByDiscipline,
    queryByTeacher,
    createTest,
}
