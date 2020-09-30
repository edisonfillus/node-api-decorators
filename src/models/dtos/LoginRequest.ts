import {IsEmail, MinLength} from "class-validator";

export class LoginRequest {

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
