import 'reflect-metadata';

import { createConnection, Connection } from 'typeorm';
//import {connectionType} from '../../settings';

//import { join } from 'path';
//const parentDir = join(__dirname, '..');

//const connectionOptions: ConnectionOptions = {
//    type: connectionType,
//    host: process.env.TYPEORM_HOST || 'localhost',
//    port: Number(process.env.TYPEORM_PORT) || 5432,
//    username: process.env.TYPEORM_USERNAME || 'postgres',
//    password: process.env.TYPEORM_PASSWORD || 'bookexampledbpassword',
//    database: process.env.TYPEORM_DATABASE || 'bookexample',
//    synchronize: true, //only use in development environment. Use migration for upgrades in production
//    logging: false,
//    entities: [
//      `${parentDir}/**/*.entity.js`,
//      `${parentDir}/**/*.repository.js`
//    ],
    //cache: true //with cache allowed in general, you can then enable it for each query using querybuilder. See https://github.com/typeorm/typeorm/blob/master/docs/caching.md
    //migrations: [
    //   "src/chapter12/basics/koa/data/migration/**/*.js"
    //],
    //subscribers: [
    //   "src/chapter12/basics/koa/data/subscriber/**/*.js"
    //],
    //cli: {
    //   "entitiesDir": "src/chapter12/basics/koa/data/model",
    //   "migrationsDir": "src/chapter12/basics/koa/data/migration",
    //   "subscribersDir": "src/chapter12/basics/koa/data/subscriber"
    //}
//};

const connection: Promise<Connection> = createConnection();

export default connection;