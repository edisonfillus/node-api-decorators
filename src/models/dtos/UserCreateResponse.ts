import {Expose} from "class-transformer";

export class UserCreateResponse {

    @Expose() id: number;
    @Expose() name: string;
    @Expose() email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}