
import { denormalize, NormalizedSchema, schema } from 'normalizr';
import { inspect } from 'util';
import { IMongoMessage } from '../../../server/src/interfaces/interfaces';

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


export const denormalizeData = (messages: NormalizedSchema<any, any>
) => {
    console.log(messages)
    const denormalizedMsg : IMongoMessage[] = denormalize(messages.result, [messagesSchema], messages.entities);
    console.log(inspect(denormalizedMsg, true, 12, false));
    return denormalizedMsg
}