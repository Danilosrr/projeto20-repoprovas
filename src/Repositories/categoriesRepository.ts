import { prisma } from "../config/database.js";

async function findCategories(){
    return await prisma.categorie.findMany({});
}

async function findCategory(id:number){
    return await prisma.categorie.findFirst({
        where: {id}
    });
}

export const categoryRepository = {
    findCategories,
    findCategory
}