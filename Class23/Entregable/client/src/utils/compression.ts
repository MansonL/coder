
import { denormalize, NormalizedSchema, schema } from 'normalizr';
import { inspect } from 'util';
import { IMongoMessage, IMongoUser } from '../../../server/src/interfaces/interfaces';

const authorsSchema = new schema.Entity(
    'authors',
    {},
    {idAttribute: "_id"}
);
const messagesSchema = new schema.Entity(
    'messages',
    {
        author: authorsSchema
    },
    {idAttribute: "_id"}
)

export interface MessagesEntities {
    authors: {
        [_id: string]: IMongoUser
    },
    messages: {
        [_id: string]: {
            [key: string]: string,
            _id: string,
            timestamp: string,
            author: string,
            message: string,
        }
    }
}

export const denormalizeData = (messages: NormalizedSchema<MessagesEntities, string[]>
) => {
    const denormalizedMsg : IMongoMessage[] = denormalize(messages.result, [messagesSchema], messages.entities);
    const normalizedBytes = JSON.stringify(messages).length;
    const denormalizedBytes = JSON.stringify(denormalizedMsg).length;
    console.log(messages);
    console.log(denormalizedMsg);
    console.log(`----------------------------- BYTES DIFFERENCE ---------------------------------------------`);
    console.log(`Normalized: ${normalizedBytes} bytes < Denormalized: ${denormalizedBytes} bytes.`);
    const percentage = Number((-(100 - denormalizedBytes * 100 / normalizedBytes)).toFixed(3));
    return { denormalizedMsg, percentage }
}