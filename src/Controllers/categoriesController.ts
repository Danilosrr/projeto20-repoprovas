import { Request, Response } from "express";
import { categoryRepository } from "../Repositories/categoriesRepository.js";
import { categorieService } from "../Services/categoriesService.js";

export async function queryCategories(req:Request,res:Response){
    const query = await categoryRepository.findCategories();
    res.send(query)
}

export async function queryDisciplines(req:Request,res:Response){
    const query = await categorieService.queryDisciplinesAndTeachers();
    res.send(query)
}