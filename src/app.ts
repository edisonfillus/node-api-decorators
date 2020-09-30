import "reflect-metadata";
import {Action, createExpressServer, UnauthorizedError, useContainer} from "routing-controllers";
import {Application} from "express";
import {Container} from "typedi";
import {TokenService} from "./services/TokenService";

useContainer(Container); // Use Dependency Injection on Controllers

const app: Application = createExpressServer({
    authorizationChecker: async (action: Action, roles: string[]) => {
        const authorization = action.request.headers["authorization"];
        if(!authorization || !authorization.match(/Bearer \w+/)) {
            throw new UnauthorizedError("Invalid authorization header");
        }
        const token = authorization.substring("Bearer ".length);
        const tokenService = Container.get(TokenService);
        const user = tokenService.validateToken(token);
        if (user && !roles.length) return true;
        //if (user && roles.find(role => user.roles.indexOf(role) !== -1))
        //    return true;
        return false;
    },
    validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
    },
    controllers: [__dirname + "/controllers/*Controller.[tj]s"]
});
export {app};