import { Router } from "express";
import categorieRouter from "./categoriesRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(testRouter);
router.use(categorieRouter);

export default router;