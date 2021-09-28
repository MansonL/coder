/**
 *
 * Different types of memory storage
 *
 */

import { FSProducts } from './DAOs/FS/products';

export enum MemoryType {
    Memory = 'MEM',
    FileSystem = 'FS',
    MySQL = 'MySQL',
    SQLITE3 = 'SQLite',
    MongoAtlas = 'Mongo-Atlas',
    LocalMongo = 'Local-Mongo',
    FireBase = 'Firebase',
}

/**
 *
 *
 * Factory of DAOs
 *
 * This class will return the selected type of memory storage
 *
 *
 */

export class ProductsFactory {
    static get(type: MemoryType) {
        switch (type) {
            case MemoryType.FileSystem:
                console.log(`Using FILESYSTEM`);
                return new FSProducts();
            case MemoryType.MySQL:
                console.log(`Using MySQL`);
                return new SQLProducts();
            default:
                console.log(`USING DEFAULT: MEMORY`);
                return new FSProducts();
        }
    }
}
