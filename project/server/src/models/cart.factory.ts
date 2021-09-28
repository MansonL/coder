import { FSCart } from './DAOs/FS/cart';
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
    static get(type: MemoryType) {
        switch (type) {
            case MemoryType.FileSystem:
                console.log(`Using FILESYSTEM`);
                return new FSCart();
            case MemoryType.MySQL:
                console.log(`Using MySQL`);
                return new SQLCart();
            default:
                console.log(`USING DEFAULT: MEMORY`);
                return new FSCart();
        }
    }
}
