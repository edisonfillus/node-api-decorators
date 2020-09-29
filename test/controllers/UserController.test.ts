import {app} from "../../src/app";
import request from "supertest";
import {Container} from "typedi";
import {UserService} from "../../src/services/UserService";


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
            .get("/users")
            .set('Accept','application/json')
            .expect(200);
        expect(getAllMock).toHaveBeenCalled();
        expect(response.body).toStrictEqual(expected);
    })
})