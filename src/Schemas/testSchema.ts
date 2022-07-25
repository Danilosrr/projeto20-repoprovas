import joi from "joi"
import { bodyTest } from "../Repositories/testRepository.js"

export const testSchema = joi.object<bodyTest>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().integer().required(),
    teacherId: joi.number().integer().required(),
    disciplineId: joi.number().integer().required() 
});