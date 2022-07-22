import { Test } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createTest = Omit<Test, "id">

async function findByName(name:string){
    return await prisma.test.findFirst({
        where: {name}
    });
}

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
                            teacher: {}
                        }}
                    }}        
                }
            }
        }
    })
}

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
                                        teacher: {}
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

async function createTest(createTest:createTest){
    return await prisma.test.create({ data:createTest });
}

export const testRepository = {
    findByName,
    queryByTeacher,
    queryByTerm,
    createTest
}