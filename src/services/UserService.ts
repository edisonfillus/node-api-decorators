import {Service} from "typedi";
import {plainToClass} from "class-transformer";
import {UserListResponse} from "../models/dtos/UserListResponse";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import bcrypt from "bcrypt";
import {User} from "../models/entities/User";
import {UserCreateResponse} from "../models/dtos/UserCreateResponse";
import {UserFindResponse} from "../models/dtos/UserFindResponse";
import {UserNotFoundError} from "../errors/UserNotFoundError";
import {UserAlreadyExistsError} from "../errors/UserAlreadyExistsError";

@Service()
export class UserService {

    static repository: User[] = [];
    static sequence = 1;

    getAll(): UserListResponse[] {
        const result = UserService.repository;
        return plainToClass(UserListResponse, result, {excludeExtraneousValues: true})
    }

    findById(id: number): UserFindResponse {
        const user = UserService.repository.find(user => user.id == id);
        if (!user) throw new UserNotFoundError();
        return plainToClass(UserFindResponse, user, {excludeExtraneousValues: true});
    }

    async create(request: UserCreateRequest): Promise<UserCreateResponse> {
        if (UserService.repository.some(u => u.email === request.email)) {
            throw new UserAlreadyExistsError();
        }
        const hashedPassword = await bcrypt.hash(request.password, 10);
        const user = new User(UserService.sequence++, request.name, request.email, hashedPassword);
        UserService.repository.push(user);
        return plainToClass(UserCreateResponse, user, {excludeExtraneousValues: true});
    }

}