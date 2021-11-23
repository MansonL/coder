import { connect } from 'mongoose';
import { storage } from '../../../api/products';
import { MemoryType } from '../../productsFactory';
import { atlasURI, mongoURI } from './models';

const mongoURL = storage === MemoryType.MongoAtlas ? atlasURI : mongoURI;

export const mongoConnection = async () => {
    try {
        await connect(mongoURL);
        return `Mongo DB connected`;
    } catch (error) {
        return error;
    }
};
//.then(m => {
//console.log('Mongo DB Connected');
//return m.connection.getClient();
