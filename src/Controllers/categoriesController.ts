import { Request, Response } from "express";
import { categoryRepository } from "../Repositories/categoriesRepository.js";

export async function queryCategories(req:Request,res:Response){
    const query = await categoryRepository.findCategories();
    res.send(query)
}