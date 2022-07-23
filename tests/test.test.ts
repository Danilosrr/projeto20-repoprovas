import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import { userData } from "./factories/userFactory.js";

let token;

beforeAll( async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users";`;

    const userSignIn = userData.signInData();
    await supertest(app).post('/sign-up').send(
        {...userSignIn, confirmPassword: userSignIn.password}
    );
    const response = await supertest(app).post('/sign-in').send(
        userSignIn
    );
    token = response.body.token;
});

describe("GET /tests?groupBy=disciplines", () => {  
    it("should return a status 200", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=disciplines")
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("object returned should be a array", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=disciplines")
            .set('Authorization', 'bearer ' + token);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("GET /tests?groupBy=teachers", () => {
    it("should return a status 200", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=teachers")
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
    });

    it("object returned should be a array", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=teachers")
            .set('Authorization', 'bearer ' + token);
        expect(Array.isArray(response.body)).toBe(true);
    });
});