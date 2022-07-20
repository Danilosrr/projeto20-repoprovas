import { Router } from "express";
import { signIn, signUp } from "../Controllers/userController.js";
import validSchema from "../Middlewares/validateSchema.js";
import { userSchema } from "../Schemas/userSchema.js";

const userRouter = Router()

userRouter.post('/signin', validSchema(userSchema), signIn)
userRouter.post('/signup', validSchema(userSchema), signUp)

export default userRouter;