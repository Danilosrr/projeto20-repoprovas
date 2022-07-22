import { createTest, testRepository } from "../Repositories/testRepository.js";
import { groupBy } from "../Utils/groupUtils.js";

async function queryByDiscipline(){
    const query = await testRepository.queryByTerm();

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
                                teacher: data.teacherDiscipline.teacher.name
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
    const query = await testRepository.queryByTeacher();

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
                        teacher: data.teacherDiscipline.teacher.name
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

async function createTest(test:createTest) {
    const query = await testRepository.createTest(test)

    return query;
}

export const testServices = {
    queryByDiscipline,
    queryByTeacher,
    createTest,
}
