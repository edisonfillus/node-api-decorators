import {Service} from "typedi";
import {plainToClass} from "class-transformer";
import {UserListResponse} from "../models/dtos/UserListResponse";
import {UserCreateRequest} from "../models/dtos/UserCreateRequest";
import bcrypt from "bcrypt";
import {UserCreateResponse} from "../models/dtos/UserCreateResponse";
import {UserFindResponse} from "../models/dtos/UserFindResponse";
import {UserNotFoundError} from "../errors/UserNotFoundError";
import {UserAlreadyExistsError} from "../errors/UserAlreadyExistsError";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserRepository} from "../repositories/UserRepository";

@Service()
export class UserService {

    constructor(
        @InjectRepository()
        private readonly userRepository: UserRepository) {
    }

    async findAll(): Promise<UserListResponse[]> {
        const result = await this.userRepository.find();
        return plainToClass(UserListResponse, result, {excludeExtraneousValues: true})
    }

    async findById(id: number): Promise<UserFindResponse> {
        const user = await this.userRepository.findOne({id})
        if (!user) throw new UserNotFoundError();
        return plainToClass(UserFindResponse, user, {excludeExtraneousValues: true});
    }

    async create(request: UserCreateRequest): Promise<UserCreateResponse> {
        if (await this.userRepository.findByEmail(request.email)) {
            throw new UserAlreadyExistsError();
        }
        const hashedPassword = await bcrypt.hash(request.password, 10);
        const user = this.userRepository.create();
        user.name = request.name;
        user.email = request.email;
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return plainToClass(UserCreateResponse, user, {excludeExtraneousValues: true});
    }

}