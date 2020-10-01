import {createConnection, getConnection, MigrationInterface, QueryRunner} from "typeorm";

class InitDatabaseSchema implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        console.log("MIGRATION!!!!!")
    }

    async down(queryRunner: QueryRunner): Promise<void> {

    }
}


beforeAll(async () => {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [ __dirname + './../src/models/entities/**/*{.ts,.js}'],
        migrations: [InitDatabaseSchema],
        logging: true
    })
})

afterAll(async()=>{
    return getConnection().close();
})

