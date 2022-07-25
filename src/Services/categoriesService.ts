import { disciplineRepository } from "../Repositories/disciplinesRepository.js";

async function queryDisciplinesAndTeachers(){
    const query = await disciplineRepository.findDisciplinesAndTeachers()
    return query
}

export const categorieService = {
    queryDisciplinesAndTeachers
}