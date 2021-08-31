import { Request, Response } from 'express';
import { validSave, validUpdate,  generateID, PRODUCT} from '../utils/index';
import {productModel} from '../models/products';
import EErrors from '../common/EErrors';
import moment from 'moment'


const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } =
  productModel;

const { PropertiesIncorrect , IdIncorrect, NoProducts, ProductNotFound } = EErrors

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: PRODUCT[] = await getProducts();
    if (products.length > 0){
        res.json({ data: products });
    }else{
      throw { error: NoProducts, message: "No products added." }
    }
  } catch (e) {
    res.status(404).json(e);
  }
};
const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const product: PRODUCT = await getProduct(id);
    if (product != undefined){
        res.json({ data: product });
    }else{
    throw {error: ProductNotFound, message: "Wrong id or product doesn't exist..."}
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
const saveProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (validSave(req.body)) {
      const product : PRODUCT = {
          id: generateID(),
          timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
          ...req.body
      };
      product.stock = Number(product.stock);
      product.price = Number(product.price);
      const result = await addProduct(product);
      if (result) res.json(result);
    } else {
      throw {error: PropertiesIncorrect, message: "Please, set your products properties correctly..."}
    }
  } catch (e) {
    res.status(422).json(e);
  }
};
const modifyProduct = async (req: Request, res: Response): Promise<void> => {
  try {
   const id : string = req.params.id;
   if(validUpdate(req.body) && id !== ''){
   const newProperties : PRODUCT = req.body;
   newProperties.stock = Number(newProperties.stock);
   newProperties.price = Number(newProperties.price);
   const result = await updateProduct(id, newProperties);
   if(result) res.json(result)
   }else{
   throw {error: PropertiesIncorrect, message: "Please, set your products properties correctly or input an id..."}
   }
  } catch (e) {
      res.status(422).json(e)
  }
};

const wipeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id : string = req.params.id;
        if(id !== ''){
            const result = await deleteProduct(id);
            if(result) res.json(result);
        }else{
            throw {error: IdIncorrect, message: "Please, insert a valid id..."}
        }
    } catch (e) {
        res.status(422).json(e)
    }
}

export { getOne, getAll, saveProduct, modifyProduct, wipeProduct }