import { Router } from "express";
import { addTest, queryByTerm } from "../Controllers/testController.js";

const testRouter = Router()

testRouter.get('/test/term', queryByTerm);
testRouter.post('/test', addTest)

export default testRouter;