import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import { storage } from '../../../api/products';
import { MemoryType } from '../../productsFactory';
import { atlasURI, mongoURI } from './models';

const mongoURL = storage === MemoryType.MongoAtlas ? atlasURI : mongoURI;

export const mongoConnection = ()   => {
        return mongoose.connect(mongoURL).then((data) => {
            console.log(`MongoDB Connected`);
            return data.connection.getClient();
        })
    
};
//.then(m => {
//console.log('Mongo DB Connected');
//return m.connection.getClient();
