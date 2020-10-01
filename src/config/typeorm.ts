import {createConnection, useContainer} from "typeorm";
import {Container} from "typedi";
import {config} from "./environment";

export const startDatabaseConnections = () => {
    useContainer(Container); // Use Dependency Injection of Repositories
    createConnection({
        type: "mysql",
        url: config.database.url,
        entities: [__dirname + './../models/entities/**/*{.ts,.js}'],
        logging: true,
        synchronize: true
    }).then(() => console.log("MySQL Connection OK"))
        .catch(error => console.log("MySQL Connection Error: ", error));
}

