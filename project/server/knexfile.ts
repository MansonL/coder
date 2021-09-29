export default {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            username: 'root',
            password: '12345',
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
