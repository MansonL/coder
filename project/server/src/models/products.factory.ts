import { FSProducts } from './DAOs/FS/products';
import { SQLProducts } from './DAOs/SQL/MySQL/products';

/**
 *
 * Different types of memory storage
 *
 */

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
    static get(type: MemoryType): FSProducts | SQLProducts {
        switch (type) {
            case MemoryType.FileSystem:
                console.log(`Using FILESYSTEM`);
                return new FSProducts();
            case MemoryType.MySQL:
                console.log(`Using MySQL`);
                return new SQLProducts(`mysql`);
            case MemoryType.SQLITE3:
                console.log(`Using SQLITE3`);
                return new SQLProducts('SQLITE3');
            default:
                console.log(`USING DEFAULT: MEMORY`);
                return new FSProducts();
        }
    }
}
