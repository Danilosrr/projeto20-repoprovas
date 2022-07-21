import express from "express";
import "express-async-errors";
import cors from "cors";

import handleErrors from "./Middlewares/errorHandler.js";
import router from "./Routers/routers.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(handleErrors);

export default app;