import {Service} from "typedi";
import {TokenData, TokenService} from "./TokenService";
import bcrypt from "bcrypt";
import {LoginRequest} from "../models/dtos/LoginRequest";
import {UserService} from "./UserService";
import {InvalidCredentialsError} from "../errors/InvalidCredentialsError";

@Service()
export class AuthService{

    constructor(private tokenService: TokenService) {
    }

    async login(request: LoginRequest): Promise<TokenData>{
        const user = UserService.repository.find(u=>u.email === request.email);
        if(!user) throw new InvalidCredentialsError();
        const doPasswordsMatch = await bcrypt.compare(request.password, user.password);
        if(!doPasswordsMatch) throw new InvalidCredentialsError();
        return this.tokenService.createToken({id:user.id});
    }

}