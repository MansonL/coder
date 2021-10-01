import * as dotenv from 'dotenv';
dotenv.config();
export default {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: '3306',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: 'project',
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    development2: {
        client: 'sqlite3',
        connection: { filename: './db/db.sqlite3' },
        useNullAsDefault: true,
    },
};
