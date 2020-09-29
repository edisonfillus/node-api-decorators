import "reflect-metadata";
import {app} from "../../src/app";
import request from "supertest";

describe("UserController.getAll",()=>{
    it("Should list all users",async ()=>{
        const response = await request(app)
            .get("/users")
            .set('Accept','text/plain')
            .expect(200);
        expect(response.text).toBe("This action returns all users");
    })
})