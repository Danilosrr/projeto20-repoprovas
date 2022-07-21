import { Router } from "express";
import { addTest, queryTests } from "../Controllers/testController.js";

const testRouter = Router()

testRouter.get('/tests', queryTests);
testRouter.post('/tests', addTest)

export default testRouter;