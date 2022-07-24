import { faker } from "@faker-js/faker";
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

describe("POST /tests", () => {
    it("should return a status 201 when test is created", async () => {
        const token = await userData.userToken();

        const response = await supertest(app).post("/tests").send({
            name: faker.datatype.string(),
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherId: 1,
            disciplineId: 1
        }).set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(201);
    });

    it("should return a status 403 when name is already in use", async () => {
        const token = await userData.userToken();
        const repeatedName = faker.datatype.string();

        await supertest(app).post("/tests").send({
            name: repeatedName,
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherId: 1,
            disciplineId: 1
        }).set('Authorization', 'Bearer ' + (await token).token);

        const response = await supertest(app).post("/tests").send({
            name: repeatedName,
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherId: 1,
            disciplineId: 1
        }).set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(403);
    });

    it("should return a status 404 when using a invalid input Id", async () => {
        const token = await userData.userToken();
        const repeatedName = faker.datatype.string();

        const response = await supertest(app).post("/tests").send({
            name: repeatedName,
            pdfUrl: faker.internet.url(),
            categoryId: 99,
            teacherId: 99,
            disciplineId: 99
        }).set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(404);
    });

    it("should return a status 404 when using a invalid combination of inputs", async () => {
        const token = await userData.userToken();
        const repeatedName = faker.datatype.string();

        const response = await supertest(app).post("/tests").send({
            name: repeatedName,
            pdfUrl: faker.internet.url(),
            categoryId: 1,
            teacherId: 1,
            disciplineId: 6
        }).set('Authorization', 'Bearer ' + (await token).token);
        expect(response.status).toBe(404);
    });
});

afterAll( async () => {
    await prisma.$disconnect();
});