import {Body, JsonController, Post} from "routing-controllers";
import {LoginRequest} from "../models/dtos/LoginRequest";
import {AuthService} from "../services/AuthService";
import {TokenData} from "../services/TokenService";



@JsonController("/api/auth")
export class AuthController{

    constructor(private authService: AuthService) {
    }

    @Post("/login")
    login(@Body() request: LoginRequest): Promise<TokenData>{
        return this.authService.login(request);
    }

}