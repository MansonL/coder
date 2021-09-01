import { promises as fsPromises } from 'fs';
import EErrors from '../common/EErrors';
import path from 'path';
import { findProduct, PRODUCT, productsExist } from '../utils/utils';
import { productsFile } from './products';

const cartFile = path.resolve(__dirname, '../../cart.json');

const { NoProducts, ProductNotFound } = EErrors;

class Cart {
  async getOne(id: string): Promise<PRODUCT> {
    try {
      const products = await fsPromises.readFile(cartFile, 'utf-8');
      if (productsExist(products)) {
        const productsJSON = JSON.parse(products);
        const lookedFor: PRODUCT | undefined = findProduct(productsJSON, id);
        if (lookedFor != null) return lookedFor;
        throw {
          error: ProductNotFound,
          message: "Wrong id or product isn't at cart...",
        };
      } else {
        throw { error: NoProducts, message: 'No products added to the cart.' };
      }
    } catch (e) {
      throw e;
    }
  }
  async getAll(): Promise<PRODUCT[]> {
    try {
      const products: string = await fsPromises.readFile(cartFile, 'utf-8');
      if (productsExist(products)) {
        const productsJSON: PRODUCT[] = JSON.parse(products);
        return productsJSON;
      } else {
        throw { error: NoProducts, message: 'No products added to the cart.' };
      }
    } catch (e) {
      throw e;
    }
  }
  async add(id: string): Promise<{ message: string; data: PRODUCT }> {
    try {
      const products: string = await fsPromises.readFile(productsFile, 'utf-8');
      if (productsExist(products)) {
        const productsJSON: PRODUCT[] = JSON.parse(products);
        const lookedFor: PRODUCT | undefined = findProduct(productsJSON, id);
        if (lookedFor != null) {
          const cartProducts = await fsPromises.readFile(cartFile, 'utf-8');
          let cartProductsJSON: PRODUCT[];
          if (cartProducts !== '') {
            cartProductsJSON = JSON.parse(cartProducts);
            cartProductsJSON.push(lookedFor);
            await fsPromises.writeFile(
              cartFile,
              JSON.stringify(cartProductsJSON, null, '\t')
            );
          } else {
            cartProductsJSON = [lookedFor];
            await fsPromises.writeFile(
              cartFile,
              JSON.stringify(cartProductsJSON, null, '\t')
            );
          }
          return {
            message: 'Product added to the cart successfully!',
            data: lookedFor,
          };
        } else {
          throw {
            error: ProductNotFound,
            message: "Wrong id or product doesn't exist...",
          };
        }
      } else {
        throw {
          error: NoProducts,
          message: 'No products available to add to the cart..',
        };
      }
    } catch (e) {
      throw e;
    }
  }
  async deleteProduct(id: string): Promise<{ message: string; data: PRODUCT }> {
    try {
      const cartProducts: string = await fsPromises.readFile(cartFile, 'utf-8');
      if (productsExist(cartProducts)) {
        const cartProductsJSON: PRODUCT[] = JSON.parse(cartProducts);
        const lookedFor: PRODUCT | undefined = findProduct(
          cartProductsJSON,
          id
        );
        if (lookedFor != null) {
          const arrayID: number = cartProductsJSON.indexOf(lookedFor);
          const [deleted] = cartProductsJSON.splice(arrayID, 1);

          await fsPromises.writeFile(
            cartFile,
            JSON.stringify(cartProductsJSON, null, '\t')
          );
          return {
            message: 'Product deleted from the cart successfully',
            data: deleted,
          };
        } else {
          throw {
            error: ProductNotFound,
            message: "Wrong id or the product isn't at the cart...",
          };
        }
      } else {
        throw { error: NoProducts, message: 'The cart is empty...' };
      }
    } catch (e) {
      throw e;
    }
  }
}

const cartModel: Cart = new Cart();

export default cartModel;
