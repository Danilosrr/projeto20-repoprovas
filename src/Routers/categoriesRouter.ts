import { Router } from "express";
import { queryCategories } from "../Controllers/categoriesController.js";
import validToken from "../Middlewares/validateToken.js";

const categorieRouter = Router()

categorieRouter.get('/categories', validToken, queryCategories);

export default categorieRouter;