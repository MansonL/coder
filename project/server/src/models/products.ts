import { promises as fsPromises } from 'fs'
import path from 'path';
import { PRODUCT } from '../utils/index';
import EErrors from '../common/EErrors'
import e from 'express';

const {
  NoProducts,
  ProductNotFound
} = EErrors;

const productsFile : string = path.resolve(__dirname, '../../products.json')

class Products {
  constructor() {
    this.getProducts = this.getProducts.bind(this)
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

  }
  async getProduct(id: string): Promise<PRODUCT | unknown>{
    try {
    const products : string = await fsPromises.readFile(productsFile, 'utf-8')
    const productsJSON : PRODUCT[] = JSON.parse(products);
    if(productsJSON.length > 0){
    const lookedFor : PRODUCT | undefined = productsJSON.find((product: PRODUCT) => product.id === id);
    if(lookedFor != null) return lookedFor
    throw {error: ProductNotFound, message: "Wrong id or the product doesn't exist..."}
    }else{
    throw {error: NoProducts, message: "No products added."}
    }
  }catch(e){
    return e
    }
  }
  async getProducts(): Promise<PRODUCT[]>{
   try {
     const products : string = await fsPromises.readFile(productsFile, 'utf-8');
     const productsJSON : PRODUCT[] = JSON.parse(products);
     if(productsJSON.length > 0) return productsJSON
     throw {error: NoProducts, message: "No products added."}
   } catch (e) {
     throw e
   }
  }
  async addProduct(product: PRODUCT):Promise<{message: string, data: PRODUCT}>{
  try {
    const products : string = await fsPromises.readFile(productsFile, 'utf-8');
    const productsJSON : PRODUCT[] = JSON.parse(products);
    productsJSON.push(product);
    await fsPromises.writeFile(productsFile, JSON.stringify(productsJSON,null,'\t'));
    return {message: 'Item added successfully',
           data: product           
           }
  } catch (e) {
    throw "Couldn't add the product"
  }
  } 
  async updateProduct(id: string, data: PRODUCT): Promise<{message: string, data: PRODUCT }>{
   try {
     const products : string = await fsPromises.readFile(productsFile, 'utf-8');
     const productsJSON : PRODUCT[] = JSON.parse(products);
     const lookedFor : PRODUCT | undefined = productsJSON.find(product => product.id === id);
     if(lookedFor != null){
      if(data.title !== '') lookedFor.title = data.title
      if(data.description !== '') lookedFor.description = data.description;
      if(data.code !== '') lookedFor.code = data.code;
      if(data.img !== '') lookedFor.img = data.img; 
      if(data.stock !== 0) lookedFor.stock = data.stock;
      if(data.price !== 0) lookedFor.price = data.price;
      const arrayId = productsJSON.indexOf(lookedFor);
      productsJSON[arrayId] = lookedFor;
      await fsPromises.writeFile(productsFile, JSON.stringify(productsJSON,null,'\t'));
      return {
            message: "Product updated successfully!",
            data: lookedFor 
          }
    }else{
       throw {error: ProductNotFound, message: "Wrong id or the product doesn't exist..."}
     }

   } catch (e) {
     throw e
   }
  } 
  async deleteProduct (id: string): Promise<{message: string, data: PRODUCT}>{
      const products : string = await fsPromises.readFile(productsFile, 'utf-8');
      const productsJSON : PRODUCT[] = JSON.parse(products);
      const lookedFor : PRODUCT | undefined = productsJSON.find(product => product.id === id);
      if(lookedFor != null){
      const arrayID : number = productsJSON.indexOf(lookedFor);
      const [deleted] = productsJSON.splice(arrayID,1);
      await fsPromises.writeFile(productsFile,JSON.stringify(productsJSON,null,'\t'));
      return { message: "Product successfully deleted!",
               data: deleted 
    }
      }else{
        throw {error: ProductNotFound, message: "Wrong id or the product doesn't exist..."}
      }
}
}
const  productModel = new Products();

export default productModel
