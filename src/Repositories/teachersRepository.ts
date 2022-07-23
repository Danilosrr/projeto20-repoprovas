import { prisma } from "../config/database.js";

async function queryByTeacher(){
    return await prisma.teacher.findMany({
        select: {id: true, name: true,
            TeachersDisciplines: { 
                where: {
                    Test: {
                        some: { name: {} }
                    }
                },
                select: {
                    Test: { include: { 
                        category: {},
                        teacherDiscipline: { select: { 
                            teacher: {},
                            discipline: { select:{
                                name: true
                            }}
                        }}
                    }}        
                }
            }
        }
    })
}


async function findTeacher(id:number){
    return await prisma.teacher.findFirst({
        where: {id}
    });
}

async function findTeacherDiscipline(teacherId:number,disciplineId:number){
    return await prisma.teachersDisciplines.findFirst({
        where: {teacherId,disciplineId}
    });
}

export const teacherRepository = {
    findTeacherDiscipline,
    queryByTeacher,
    findTeacher
}