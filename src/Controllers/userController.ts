import { Request, Response } from "express";
import { createUser } from "../Repositories/userRepository.js";
import { userServices } from "../Services/userService.js";

export async function signUp(req:Request, res:Response){
    const newUser:createUser = req.body;

    const signUp = await userServices.signUpService(newUser);
    res.send(signUp);
}

export async function signIn(req:Request, res:Response){
    const user:createUser = req.body;

    const signIn = await userServices.signInService(user);
    res.send(signIn);
}