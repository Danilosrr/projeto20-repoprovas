import { createTest, testRepository } from "../Repositories/testRepository.js";

async function queryByDiscipline(){
    const query = await testRepository.queryByTerm();

    const disciplines = await query.map( term => {
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
    
    return disciplines;
}

async function createTest(test:createTest) {
    const query = await testRepository.createTest(test)

    return query;
}

export const testServices = {
    queryByDiscipline,
    createTest,
}
