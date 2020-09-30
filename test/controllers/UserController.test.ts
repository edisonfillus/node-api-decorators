import {app} from "../../src/app";
import request from "supertest";
import {Container} from "typedi";
import {UserService} from "../../src/services/UserService";
import {UserCreateRequest} from "../../src/models/dtos/UserCreateRequest";


describe("UserController.getAll",()=>{
    it("Should list all users",async ()=>{
        const expected = [{
            id: 1,
            name: "Edison"
        }]
        const getAllMock = jest.fn(()=>expected)
        Container.set(UserService, {
            getAll: getAllMock
        });

        const response = await request(app)
            .get("/api/users")
            .set('Accept','application/json')
            .expect(200);
        expect(getAllMock).toHaveBeenCalled();
        expect(response.body).toStrictEqual(expected);
    })
})

describe("Create User",()=>{
    it("Should return 400 on unknown properties",async ()=>{
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
    it("Should return 400 on empty name",async ()=>{
        const body = {
            name: ""
        };
        const response = await request(app)
            .post("/api/users")
            .send(body);

        expect(response.status).toBe(400);
        expect(response.text).toContain("name should not be empty")
    })

})