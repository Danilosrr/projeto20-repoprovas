import { Router } from "express";
import { queryCategories, queryDisciplines } from "../Controllers/categoriesController.js";
import validToken from "../Middlewares/validateToken.js";

const categorieRouter = Router()

categorieRouter.get('/categories', validToken, queryCategories);
categorieRouter.get('/disciplines', validToken, queryDisciplines);

export default categorieRouter;