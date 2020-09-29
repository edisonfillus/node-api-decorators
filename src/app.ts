import "reflect-metadata";
import { createExpressServer } from "routing-controllers";

createExpressServer({
    controllers: [__dirname + "/controllers/*"]
}).listen(3000,()=>{
    console.log("Server started on port 3000");
});