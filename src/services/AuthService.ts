import {Service} from "typedi";
import {TokenData, TokenService} from "./TokenService";
import bcrypt from "bcrypt";
import {LoginRequest} from "../models/dtos/LoginRequest";
import {UserService} from "./UserService";
import {InvalidCredentialsError} from "../errors/InvalidCredentialsError";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserRepository} from "../repositories/UserRepository";

@Service()
export class AuthService{

    constructor(
        @InjectRepository()
        private readonly userRepository: UserRepository,
        private tokenService: TokenService) {
    }

    async login(request: LoginRequest): Promise<TokenData>{
        const user = await this.userRepository.findByEmail(request.email);
        if(!user) throw new InvalidCredentialsError();
        const doPasswordsMatch = await bcrypt.compare(request.password, user.password);
        if(!doPasswordsMatch) throw new InvalidCredentialsError();
        return this.tokenService.createToken({id:user.id});
    }

}