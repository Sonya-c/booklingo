require("dotenv").config();

const { connect, clearCollections } = require('../config/db');

const status = require('http-status');
const request = require("supertest");

const app = require("../app");


describe("POST /auth/login", () => {

    it("Given no email and no password, it should return an error.", async () => {
        const res = await request(app).post("/auth/login");
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given no password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "email": "email@domain.com"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given no email, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "password": "1234567"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong email and wrong password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "email": "a@a.a",
                "password": "123"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong email, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "email": "a@a.a",
                "password": "12345678"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "email": "email@domain.com",
                "password": "123"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });
});


describe("POST /auth/register", () => {
    let connection;

    beforeAll(async () => {
        connection = await connect();
    });

    it("Given no email and no password, it should return an error.", async () => {
        const res = await request(app).post("/auth/register");
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given no password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                "email": "email@domain.com"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given no email, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                "password": "1234567"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong email and wrong password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                "email": "a@a.a",
                "password": "123"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong email, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                "email": "a@a.a",
                "password": "12345678"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given wrong password, it should return an error.", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                "email": "email@domain.com",
                "password": "123"
            });
        expect(res.statusCode).toBe(status.UNPROCESSABLE_ENTITY);
    });

    it("Given good email and password, it should return a new user and a jwt.", async () => {
        const email = "email@domain.com";

        let res = await request(app)
            .post("/auth/register")
            .send({
                email,
                "password": "123456789"
            }).expect(status.CREATED);

        expect(res.body.user.email).toBe(email);
        expect(res.body.accessToken).toBeDefined();
    });

    afterAll(async () => {
        await clearCollections(connection);
        connection.close()
    });
});


describe("POST /auth/logout", () => {
    // TODO: logout test 
});
