import { FSCart } from './DAOs/FS/cart';
import { MongoCart } from './DAOs/Mongo/cart';
import { SQLCart } from './DAOs/SQL/MySQL/cart';
import { MemoryType } from './products.factory';

/**
 *
 *
 * Factory of DAOs
 *
 * This class will return the selected type of memory storage
 *
 *
 */

export class CartFactory {
    static get(type: MemoryType): FSCart | SQLCart | MongoCart{
        switch (type) {
            case MemoryType.FileSystem:
                console.log(`Using FILESYSTEM`);
                return new FSCart();
            case MemoryType.MySQL:
                console.log(`Using MySQL`);
                return new SQLCart('mysql');
            case MemoryType.SQLITE3:
                console.log(`Using SQLITE3`);
                return new SQLCart('SQLITE3');
            case MemoryType.MongoAtlas:
                console.log(`Using ATLAS`);
                return new MongoCart('Atlas');
            case MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new MongoCart('local')
            default:
                console.log(`USING DEFAULT: MEMORY`);
                return new FSCart();
        }
    }
}
