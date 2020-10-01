import {app} from "../app";
import request from "supertest";
import {Container} from "typedi";
import {UserService} from "../services/UserService";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import {TokenService} from "../services/TokenService";
import {UserCreateResponse} from "../models/dtos/UserCreateResponse";
import {UserFindResponse} from "../models/dtos/UserFindResponse";
import {UserNotFoundError} from "../errors/UserNotFoundError";

const tokenService = Container.get(TokenService);

describe("UserController.findById", () => {
    beforeEach(()=>{
        Container.reset();
    })
    it("Should return 401 if not authenticated", async () => {
        const response = await request(app)
            .get("/api/users/1")

        expect(response.status).toBe(401);
    })
    it("Should return 404 if not existent", async () => {
        const token = tokenService.createToken({id: 1}).token;
        const findByIdMock = jest.fn(() => {throw new UserNotFoundError()});
        Container.set(UserService, {
            findById: findByIdMock
        });

        const response = await request(app)
            .get("/api/users/1")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(404);
    })


    it("Should return 500 on Error", async ()=>{
        const token = tokenService.createToken({id: 1}).token;
        const findByIdMock = jest.fn(() => {throw new Error("System Failure")});
        Container.set(UserService, {
            findById: findByIdMock
        });

        const response = await request(app)
            .get("/api/users/1")
            .set("Authorization", "Bearer " + token);

        expect(findByIdMock).toBeCalled();
        expect(response.status).toBe(500);
        expect(response.text).toContain("System Failure");
    })

    it("Should return user if all OK", async ()=>{
        const token = tokenService.createToken({id: 1}).token;
        const expected: UserFindResponse = {
            id: 1,
            email: "user@mail.com",
            name: "Test User"
        }
        const findByIdMock = jest.fn(() => expected);
        Container.set(UserService, {
            findById: findByIdMock
        });

        const response = await request(app)
            .get("/api/users/1")
            .set("Authorization", "Bearer " + token);

        expect(findByIdMock).toBeCalledWith(1);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expected);
    })
})

describe("UserController.findAll", () => {
    beforeEach(()=>{
        Container.reset();
    })
    it("Should list all users", async () => {
        const expected = [{
            id: 1,
            name: "Edison"
        }]
        const findAllMock = jest.fn(() => expected)
        Container.set(UserService, {
            findAll: findAllMock
        });

        const response = await request(app)
            .get("/api/users")
            .set('Accept', 'application/json')
            .expect(200);
        expect(findAllMock).toHaveBeenCalled();
        expect(response.body).toStrictEqual(expected);
    })
})

describe("Create User", () => {
    beforeEach(()=>{
        Container.reset();
    })
    it("Should return 400 on unknown properties", async () => {
        const body = {
            id: 2,
            name: "Edison"
        };
        const response = await request(app)
            .post("/api/users")
            .send(body);

        expect(response.status).toBe(400);
        expect(response.text).toContain("id should not exist")
    })
    it("Should return 400 on empty name", async () => {
        const body = {
            name: ""
        };
        const response = await request(app)
            .post("/api/users")
            .send(body);

        expect(response.status).toBe(400);
        expect(response.text).toContain("name should not be empty")
    })

    it("Should return 200 on valid user", async () => {
        const body: UserCreateRequest = {
            name: "Edison",
            email: "edison.fillus@gmail.com",
            password: "123456"
        };
        const expected: UserCreateResponse = {
            id: 1,
            name: "Edison",
            email: "edison.fillus@gmail.com"
        }
        const createMock = jest.fn(() => expected)
        Container.set(UserService, {
            create: createMock
        });

        const response = await request(app)
            .post("/api/users")
            .send(body);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expected)
    })

})