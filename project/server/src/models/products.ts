import { promises as fsPromises } from 'fs'
import path from 'path';
import { PRODUCT } from '../utils/index';
import EErrors from '../common/EErrors'
import { findProduct } from '../utils/index';

const {
  NoProducts,
  ProductNotFound
} = EErrors;

const productsFile : string = path.resolve(__dirname, '../../products.json')

class Products {
  async getProduct(id: string): Promise<PRODUCT>{
    try {
    const products : string = await fsPromises.readFile(productsFile, 'utf-8')
    const productsJSON : PRODUCT[] = JSON.parse(products);
    if(productsJSON.length > 0){
    const lookedFor : PRODUCT | undefined = findProduct(productsJSON, id)
    if(lookedFor != null) return lookedFor
    throw {error: ProductNotFound, message: "Wrong id or the product doesn't exist..."}
    }else{
    throw {error: NoProducts, message: "No products added."}
    }
  }catch(e){
    throw e
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
    let productsJSON : PRODUCT[]
    if(products === ''){
     productsJSON = [product]
    }else{
    productsJSON = JSON.parse(products);
    console.log(productsJSON);
    productsJSON.push(product);
    }
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
     const lookedFor : PRODUCT | undefined = findProduct(productsJSON, id);
     if(lookedFor != null){
      console.log(data.price)
      if(data.title !== '' && data.title != null) lookedFor.title = data.title
      if(data.description !== '' && data.description != null) lookedFor.description = data.description;
      if(data.code !== '' && data.code != null) lookedFor.code = data.code;
      if(data.img !== '' && data.img != null) lookedFor.img = data.img; 
      if(data.stock !== -1 && !isNaN(data.stock)) lookedFor.stock = data.stock; //  HERE WE USE -1 AS A VALUE
      if(data.price !== -1 && !isNaN(data.price)) lookedFor.price = data.price; // FOR NOT CHANGING STOCK OR PRICE
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
      const lookedFor : PRODUCT | undefined = findProduct(productsJSON, id);
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

export { productModel, productsFile }
