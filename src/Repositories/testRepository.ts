import { Test } from "@prisma/client";
import { prisma } from "../config/database.js";

export type createTest = Omit<Test, "id">
export type bodyTest = Omit<Test, "id"|"teacherDisciplineId"> & {
    teacherId: number,
    disciplineId:number
}

async function findTestName(name:string){
    return await prisma.test.findFirst({
        where: {name}
    });
}



async function createTest(createTest:createTest){
    return await prisma.test.create({ data:createTest });
}

export const testRepository = {
    findTestName,
    createTest
}