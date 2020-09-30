import {IsNotEmpty} from "class-validator";

export class UserCreateRequest{

    @IsNotEmpty()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}