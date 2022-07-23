import { prisma } from "../config/database.js";

async function queryByTerm(){
    return await prisma.term.findMany({
        orderBy: { number: "asc" },
        include: {
            Discipline: {
                include: {
                    TeachersDisciplines: {
                        where: {
                            Test: {
                                some: { name: {} },
                            },
                        },
                        select: {
                            Test: { include: { 
                                category: {},
                                teacherDiscipline: {
                                    select: {
                                        teacher: {},
                                        discipline: { select:{
                                            name: true
                                        }}
                                    }
                                }
                            }
                        },
                    },
                },
            }},
        },
    });
}

export const termRepository = {
    queryByTerm
}