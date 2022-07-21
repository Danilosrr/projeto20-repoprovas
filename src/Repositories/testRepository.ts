import { Test } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createTest = Omit<Test, "id">

async function findByName(name:string){
    return await prisma.test.findFirst({
        where: {name}
    });
}

async function findByTerms(){

}

async function queryByTerm(){
    return prisma.term.findMany({
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
                        include: {
                            discipline: {},
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

async function queryByDiscipline(name:string){
    return await prisma.discipline.findMany({
        where: {name},
        select: {
            TeachersDisciplines: { select: {
                Test: {
                    include: {
                        category: { select: { name: true}}
                    }
                }
            } }
        }
    });
}

async function createTest(createTest:createTest){
    return await prisma.test.create({ data:createTest });
}

export const testRepository = {
    findByName,
    queryByTerm,
    queryByDiscipline,
    createTest,
    findByTerms
}
/*
where: {
    id
},
include: { 
    TeachersDisciplines: { 
        select: { 
            discipline: {
                select:{
                    name: true,
                    termId: true
                }
            },
            Test: {
                select: {
                    id: true, 
                    name: true, 
                    pdfUrl: true, 
                    categoryId: true, 
                    teacherDisciplineId: true,
                    category: {
                        select: { name: true }
                    }
                }
            } 
        }
    }
}*/