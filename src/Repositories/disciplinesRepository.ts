import { prisma } from "../config/database.js";

async function findDiscipline(id:number){
    return await prisma.discipline.findFirst({
        where: {id}
    });
}

async function findDisciplinesAndTeachers(){
    return await prisma.teachersDisciplines.findMany({
        select:{ 
            discipline:{
                select: { id: true, name: true}
            },
            teacher:{ 
                select: { id: true, name: true }
            }
        }
    });
}

export const disciplineRepository = {
    findDisciplinesAndTeachers,
    findDiscipline
}