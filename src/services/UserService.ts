import {Service} from "typedi";
import {plainToClass} from "class-transformer";
import {UserListResponse} from "../models/dtos/UserListResponse";

@Service()
export class UserService {

    static repository = [{
        id: 1,
        name: "Edison"
    }];

    getAll(): UserListResponse[]{
        const result = UserService.repository;
        return plainToClass(UserListResponse,result)
    }

    findById(id: number){
        return UserService.repository.find(user=>user.id);
    }

}