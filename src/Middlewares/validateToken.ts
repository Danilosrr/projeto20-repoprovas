import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "./errorHandler.js";
import { token } from "../Repositories/userRepository.js";

export default async function validToken(req:Request,res:Response,next:NextFunction){
    const { authorization } = req.headers;    
    const secretKey = process.env.JWT_KEY;
 
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) throw unauthorizedError("missing token");
        
    const verify = jwt.verify(token, secretKey, function(err){ 
        if (err) throw unauthorizedError("unauthorized token");
    });
    const tokenObj = jwt.decode(token) as token;

    res.locals.token = tokenObj;
    next();
}