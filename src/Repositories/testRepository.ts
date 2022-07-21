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

async function queryByDiscipline(name:string){

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