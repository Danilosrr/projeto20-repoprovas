import { Request, Response } from "express";
import { createTest } from "../Repositories/testRepository.js";
import { testServices } from "../Services/testService.js";

export async function addTest(req:Request, res:Response) {
    const test:createTest = req.body;

    const create = await testServices.createTest(test);
    
    res.send(create);
}

export async function queryByTerm(req:Request, res:Response){
    const query = await testServices.queryByTerm();

    res.send(query);
}