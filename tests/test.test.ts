import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import { userData } from "./factories/userFactory.js";

beforeEach( async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users";`;
});

describe("GET /tests?groupBy=disciplines", () => {  
    const token = userData.userToken();

    it("should return a status 200", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=disciplines")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(200);
    });

    it("object returned should be a array", async () => {
        const response = await supertest(app)
            .get("/tests?groupBy=disciplines")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("GET /tests?groupBy=teachers", () => {
    it("should return a status 200", async () => {
        const token = await userData.userToken();
        const response = await supertest(app)
            .get("/tests?groupBy=teachers")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(200);
    });

    it("object returned should be a array", async () => {
        const token = await userData.userToken();
        const response = await supertest(app)
            .get("/tests?groupBy=teachers")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("GET /categories", () => {
    it("should return a status 200", async () => {
        const token = await userData.userToken();
        const response = await supertest(app)
            .get("/categories")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(200);
    });

    it("object returned should be a array", async () => {
        const token = await userData.userToken();
        const response = await supertest(app)
            .get("/categories")
            .set('Authorization', 'Bearer ' + (await token).token);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

afterAll( async () => {
    await prisma.$disconnect();
});