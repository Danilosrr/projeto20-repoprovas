import { query, Request, Response } from "express";
import { badRequestError } from "../Middlewares/errorHandler.js";
import { bodyTest, createTest } from "../Repositories/testRepository.js";
import { testServices } from "../Services/testService.js";

export async function addTest(req:Request, res:Response) {
    const test:bodyTest = req.body;

    const create = await testServices.createTest(test);
    
    res.status(201).send(create);
}

export async function queryTests(req:Request, res:Response){
    const { groupBy }: any = req.query;

    if (groupBy === "disciplines") {
        const query = await testServices.queryByDiscipline();
        return res.send( query );
    }
    if (groupBy === "teachers") {
        const query = await testServices.queryByTeacher()
        return res.send(query);
    }

    throw badRequestError("query param not valid");
}