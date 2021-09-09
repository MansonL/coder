import { Knex } from 'knex';
import moment from 'moment';
const seed = (knex: Knex) => {
    const welcome = {
        time: moment().format('MM D YYYY HH mm ss'),
        user: 'Welcome Bot',
        message: 'Welcome everyone to my Message API chat.',
    };
    const botUser = {
        user: 'WelcomeBot'
    }
    return knex('messages').del()
    .then(()=>knex('users').del())
    .then(()=>knex('messages').insert(welcome))
    .then(()=>knex('users').insert(botUser))
};
export { seed };
