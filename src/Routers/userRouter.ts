import { Router } from "express";
import { signIn, signUp } from "../Controllers/userController.js";
import validSchema from "../Middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../Schemas/userSchema.js";

const userRouter = Router()

userRouter.post('/signin', validSchema(signInSchema), signIn)
userRouter.post('/signup', validSchema(signUpSchema), signUp)

export default userRouter;