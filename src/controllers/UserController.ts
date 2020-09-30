import {Param, Body, Get, Post, Put, Delete, JsonController, Authorized} from "routing-controllers";
import {UserService} from "../services/UserService";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import {UserListResponse} from "../models/dtos/UserListResponse";
import {UserCreateResponse} from "../models/dtos/UserCreateResponse";

@JsonController("/api/users")
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get("/")
    getAll(): UserListResponse[] {
        return this.userService.getAll();
    }

    @Get("/:id")
    @Authorized()
    getOne(@Param("id") id: number) {
        return this.userService.findById(id);
    }

    @Post("/")
    createUser(@Body() user: UserCreateRequest): Promise<UserCreateResponse> {
        return this.userService.create(user);
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