import { promises as fsPromises } from 'fs'
import path from 'path';
import { PRODUCT } from '../utils/index';

const productsFile : string = path.resolve(__dirname, '../../products.json')

class Products {
  constructor() {
    this.getProducts = this.getProducts.bind(this)
    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

  }
  async getProduct(id: string): Promise<PRODUCT>{
    try {
    const products = await fsPromises.readFile(productsFile, 'utf-8')
    const productsJSON = JSON.parse(products);
    const lookedFor : PRODUCT = productsJSON.find((product: PRODUCT) => product.id === id);
    return lookedFor
  }catch(e){
    throw {error: e, message: "Wrong id or producn't doesn't exist..."}
    }
  }
  async getProducts(){
   try {
     
   } catch (e) {
     
   }
  }
  async addProduct(){
  try {
    
  } catch (e) {
    
  }
  } 
  updateProduct(){

  } 
  deleteProduct (){
      
}
}
const  productModel = new Products();

export default productModel
