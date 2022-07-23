import { prisma } from "../config/database.js";

async function findDiscipline(id:number){
    return await prisma.discipline.findFirst({
        where: {id}
    });
}

export const disciplineRepository = {
    findDiscipline
}