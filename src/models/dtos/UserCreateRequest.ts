import {IsEmail, IsNotEmpty, MinLength} from "class-validator";
import {Expose} from "class-transformer";

export class UserCreateRequest{

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}