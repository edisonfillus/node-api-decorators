import "reflect-metadata";
import {createExpressServer, useContainer} from "routing-controllers";
import {Application} from "express";
import {Container} from "typedi";

useContainer(Container); // Use Dependency Injection on Controllers

const app: Application = createExpressServer({
    controllers: [__dirname + "/controllers/*"]
});
export {app};