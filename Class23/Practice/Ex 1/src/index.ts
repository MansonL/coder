import  { denormalize, normalize, schema } from 'normalizr';
import * as path from 'path';
import { writeFile, readFile } from 'fs/promises';
import { inspect } from 'util';

const dataPath = path.resolve(__dirname, './data/data.json');

const authorsSchema = new schema.Entity('authors',
{},
{idAttribute: "_id"});
const commentsSchema = new schema.Entity('comments', {
    commenter: authorsSchema
});
const postsSchema = new schema.Entity('posts', {
    author: authorsSchema,
    comments: [commentsSchema]
});

(async () => {
    const data = await readFile(dataPath, 'utf-8');
    const dataJSON = JSON.parse(data);
    const normalizedData = normalize(dataJSON, [postsSchema]);
    const normalizedValues = Object.values(normalizedData)
    console.log(dataJSON.length);
    console.log(normalizedValues)

})()


