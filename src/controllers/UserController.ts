import {Param, Body, Get, Post, Put, Delete, OnUndefined, JsonController} from "routing-controllers";
import {UserService} from "../services/UserService";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import {UserListResponse} from "../models/dtos/UserListResponse";

@JsonController("/api/users")
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get("/")
    getAll(): UserListResponse[] {
        return this.userService.getAll();
    }

    @Get("/:id")
    @OnUndefined(404)
    getOne(@Param("id") id: number) {
        return this.userService.findById(id);
    }

    @Post("/")
    createUser(@Body() user: UserCreateRequest) {
        return "Saving user...";
    }

    @Put("/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/:id")
    remove(@Param("id") id: number) {
        return "Removing user...";
    }

}