import supertest from "supertest";
import { prisma } from "../src/config/database.js";
import app from "./../src/app.js";
import { userData } from "./factories/userFactory.js";


beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users";`;
});

describe("POST /sign-up", () => {
  const userSignIn = userData.signInData();

  it("should return a status 201 when sign-up is done", async () => {
    const response = await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    expect(response.status).toBe(201);
  });

  it("should return a status 403 when password is only numbers", async () => {
    const numericPassword = userData.passwordNumeric();

    const response = await supertest(app).post("/sign-up").send({
      email: userSignIn.email,
      password: numericPassword,
      confirmPassword: numericPassword
    });
    expect(response.status).toBe(403);
  });

  it("should return a status 422 when password length is under minimun(8)", async () => {
    const smallPassword = userData.passwordLength(7);
    const response = await supertest(app).post("/sign-up").send({
      email: userSignIn.email,
      password: smallPassword,
      confirmPassword: smallPassword
    });
    expect(response.status).toBe(422);
  });

  it("should return a status 422 when password and confirmPassword not match", async () => {
    const response = await supertest(app).post("/sign-up").send({
      ...userSignIn, confirmPassword: userData.passwordLength(10)
    });
    expect(response.status).toBe(422);
  });

  it("should return a status 409 when email is already in use", async () => {
    await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    const response = await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    expect(response.status).toBe(409);
  });
});

describe("POST /sign-in", () => {
  const userSignIn = userData.signInData();

  it("should return a status 200 when sign-in is done", async () => {
    await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    const response = await supertest(app).post("/sign-in").send(
      userSignIn
    );
    expect(response.status).toBe(200);
  });

  it("should return a token when sign-in is done", async () => {
    await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    const response = await supertest(app).post("/sign-in").send(
      userSignIn
    );
    expect(response.body.token).toBeDefined();
  });

  it("should return a status 404 when trying to sign-in with a unregistered email", async () => {
    const response = await supertest(app).post("/sign-in").send(
      {email: userData.randomEmail(), password: userSignIn.password}
    );
    expect(response.status).toBe(404);
  });

  it("should return a status 403 when trying to sign-in with wrong password", async () => {
    await supertest(app).post("/sign-up").send(
      {...userSignIn, confirmPassword: userSignIn.password}
    );
    const response = await supertest(app).post("/sign-in").send(
      {email: userSignIn.email, password: userData.passwordLength(10)}
    );
    expect(response.status).toBe(403);
  });
});

afterAll( async () => {
  await prisma.$disconnect();
});