import { connect } from 'mongoose';
import { storage } from '../../../api/products';
import { MemoryType } from '../../productsFactory';
import { atlasURI, mongoURI } from './models';
import { MongoClient } from 'mongodb'

const mongoURL = storage === MemoryType.MongoAtlas ? atlasURI : mongoURI;

export const mongoConnection = async ()  => {
        return connect(mongoURL).then((data) => {
            console.log(`MongoDB Connected`);
            return data.connection.getClient();
        })
    
};
//.then(m => {
//console.log('Mongo DB Connected');
//return m.connection.getClient();
