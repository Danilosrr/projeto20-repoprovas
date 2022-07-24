import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { token, userRepository } from "../../src/Repositories/userRepository.js";
import { encrypt } from "../../src/Utils/encryptUtils.js";

function signInData(){
    const data = {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    };

    return data;
}

function passwordNumeric(){
    return faker.internet.password(10,false,/[0-9]/);
}

function passwordLength(number:number){
    return faker.internet.password(number);
}

function randomEmail(){
    return faker.internet.email();
}

async function userDatabase() {
    const user = signInData();
    const password = encrypt(user.password);
    const register = await userRepository.createUser({email:user.email, password});

    return {email:user.email, password};
}

async function userToken() {
    const user = signInData();
    const password = encrypt(user.password);
    const register = await userRepository.createUser({email:user.email, password});

    const token = jwt.sign({email:user.email, password}, process.env.JWT_KEY);
    return { token:token };
}

export const userData = {
    passwordNumeric,
    passwordLength,
    randomEmail,
    signInData,
    userDatabase,
    userToken,
}