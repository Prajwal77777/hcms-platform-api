import { MikroORM } from "@mikro-orm/core";
import config from "./src/mikro-orm.config";

async function createDatabase() {
    const orm = await MikroORM.init(config);

    await orm.getSchemaGenerator().createDatabase();
    console.log('Database and schema created successfully!');

    await orm.close();
}

createDatabase().catch((e) => {
    console.error(e);
    process.exit(1);
})