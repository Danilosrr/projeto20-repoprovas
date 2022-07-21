import joi from "joi"
import { createTest } from "../Repositories/testRepository.js"

export const testSchema = joi.object<createTest>({
    name: joi.string().required(),
    pdfUrl: joi.number().integer().required(),
    categoryId: joi.number().integer().required(),
    teacherDisciplineId: joi.number().integer().required(),
});