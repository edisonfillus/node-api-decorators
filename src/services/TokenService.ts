import jwt, {Secret} from "jsonwebtoken";
import {config} from "../config/environment";
import {Service} from "typedi";
import {InvalidTokenError} from "../errors/InvalidTokenError";

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    id: number;
}

@Service()
export class TokenService {

    createToken(data: DataStoredInToken): TokenData {
        const expiresIn = 60 * 60; // 1H
        const secret: Secret = config.jwtSecret;
        return {
            expiresIn,
            token: jwt.sign(data, secret, {expiresIn}),
        };
    }

    validateToken(token: string): DataStoredInToken {
        try{
            return jwt.verify(token, config.jwtSecret) as DataStoredInToken;
        } catch(error){
            throw new InvalidTokenError();
        }

    }

}