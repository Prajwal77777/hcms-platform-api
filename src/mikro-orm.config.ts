import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config: Options<PostgreSqlDriver> = {
    migrations: {
        path: 'src/migrations',
        pathTs: 'src/migrations',
        disableForeignKeys: false,
    },
    entities: ['./src/entities/**/*.js'],
    entitiesTs: ['./src/entities/**/*.ts'],
    dbName: 'hcms-platform-api-nest-js',
    driver: PostgreSqlDriver,
    user: 'prajwal',
    password: 'Prajwal@185',
    host: 'localhost',
    port: 5432,
    debug: true,
    allowGlobalContext: true,
};

export default config;