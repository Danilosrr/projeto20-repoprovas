import { faker } from "@faker-js/faker";

function signInData(){
    const data = {
        email: faker.internet.email(),
        password: faker.internet.password(10)
    };

    return data;
}

function passwordNumeric(){
    return faker.internet.password(10,false,/[0-9]/)
}

function passwordLength(number:number){
    return faker.internet.password(number)
}

export const userFactory = {
    passwordNumeric,
    passwordLength,
    signInData,
}