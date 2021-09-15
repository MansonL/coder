"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.development = void 0;
var development = {
    client: 'sqlite3',
    connection: { filename: './msgDB' },
    useNullAsDefault: true,
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds',
    }
};
exports.development = development;
var production = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'messages',
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds',
    },
};
exports.production = production;
