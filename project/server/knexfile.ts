export default {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: '3306',
            username: 'root',
            password: '12345',
            database: 'project',
        },
        useNullAsDefault: true,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    development2: {
        client: 'sqlite3',
        connection: { filename: './db.sqlite3' },
        migrations: { directory: __dirname + '/db/migrations' },
        seeds: { directory: __dirname + '/db/seeds' },
    },
};
