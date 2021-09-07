import { Knex } from 'knex';
import moment from 'moment';
const seed = (knex: Knex) => {
    const welcome = {
        time: moment().format('MM D YYYY HH mm ss'),
        user: 'Welcome Bot',
        message: 'Welcome everyone to my Message API chat.',
    };
    return knex.table('messages').del().insert(welcome);
};
