import {app} from "./app";
import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";

useContainer(Container);
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [
        __dirname + '/models/entities/**/*{.ts,.js}'
    ],
    logging: true,
    synchronize: true
}).then(async connection => {
    console.log("MySQL Connection OK");
}).catch(error => console.log("MySQL Connection Error: ", error));

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});