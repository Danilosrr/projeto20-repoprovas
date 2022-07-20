import jwt from "jsonwebtoken";
import { conflictError, forbiddenError, notFoundError } from "../Middlewares/errorHandler.js";
import { createUser, userRepository } from "../Repositories/userRepository.js";
import { compare, encrypt } from "../Utils/encryptUtils.js";

async function signUpService(createUser:createUser){
    const { email } = createUser;
    const password = await encrypt(createUser.password);

    const conflict = await userRepository.findByEmail(email);
    if (conflict) throw conflictError("email already used");

    const signUp = await userRepository.createUser({ email, password });
    return signUp;
};

async function signInService(createUser:createUser){
    const { email, password } = createUser;

    const emailFound = await userRepository.findByEmail(email);
    if (!emailFound) throw notFoundError("email not found");

    const passwordMatch = compare(password, emailFound.password);
    if (!passwordMatch) throw forbiddenError("incorrect password");

    const token = jwt.sign({...createUser,id:emailFound.id}, process.env.JWT_KEY);
    return token
};

export const userServices = {
    signInService,
    signUpService
}