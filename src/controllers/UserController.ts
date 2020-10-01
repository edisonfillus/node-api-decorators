import {Param, Body, Get, Post, Put, Delete, JsonController, Authorized} from "routing-controllers";
import {UserService} from "../services/UserService";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import {UserListResponse} from "../models/dtos/UserListResponse";
import {UserCreateResponse} from "../models/dtos/UserCreateResponse";
import {UserFindResponse} from "../models/dtos/UserFindResponse";

@JsonController("/api/users")
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get("/")
    getAll(): Promise<UserListResponse[]> {
        return this.userService.findAll();
    }

    @Get("/:id")
    @Authorized()
    getOne(@Param("id") id: number): Promise<UserFindResponse> {
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