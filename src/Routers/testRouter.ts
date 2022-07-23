import { Router } from "express";
import { addTest, queryTests } from "../Controllers/testController.js";
import validSchema from "../Middlewares/validateSchema.js";
import validToken from "../Middlewares/validateToken.js";
import { testSchema } from "../Schemas/testSchema.js";

const testRouter = Router()

testRouter.get('/tests', queryTests);
testRouter.post('/tests', validSchema(testSchema), validToken, addTest)

export default testRouter;