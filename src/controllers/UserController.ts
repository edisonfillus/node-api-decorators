import {Param, Body, Get, Post, Put, Delete, Controller} from "routing-controllers";
import {UserService} from "../services/UserService";

@Controller()
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get("/users")
    getAll() {
        return this.userService.getAll();
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

    @Post("/users")
    post(@Body() user: any) {
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        return "Removing user...";
    }

}