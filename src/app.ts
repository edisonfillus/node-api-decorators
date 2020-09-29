import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {Application} from "express";

const app: Application = createExpressServer({
    controllers: [__dirname + "/controllers/*"]
});
export {app};