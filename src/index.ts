import {app} from "./app";
import {startDatabaseConnections} from "./config/typeorm";

startDatabaseConnections();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});