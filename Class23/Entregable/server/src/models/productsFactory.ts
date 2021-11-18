import { MongoProducts } from './DAOs/Mongo/products';

/**
 *
 * Different types of memory storage
 *
 */

export enum MemoryType {
    MongoAtlas = 'Mongo-Atlas',
    LocalMongo = 'Local-Mongo',
}

/**
 *
 *
 * Factory of Products DAOs
 *
 * This class will return the selected type of memory storage
 *
 *
 */

export class ProductsFactory {
    static get(type: MemoryType): MongoProducts {
        switch (type) {
            case MemoryType.MongoAtlas:
                console.log(`Using MongoAtlas`);
                return new MongoProducts('atlas');
            case MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new MongoProducts('local');
            default:
                console.log(`DEFAULT: MongoAtlas`);
                return new MongoProducts('atlas');
        }
    }
}
