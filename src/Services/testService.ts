import { createTest, testRepository } from "../Repositories/testRepository.js";

async function queryByTerm(){
    const query = await testRepository.queryByTerm();

    const disciplines = await query.map( term => {
        return { 
            term: term.number,
            disciplines: term.Discipline.map( discipline =>{
                return {
                    name: discipline.name,
                    tests: discipline.TeachersDisciplines.map( test =>{ 
                        return test.Test
                    })
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
    queryByTerm,
    createTest,
}
