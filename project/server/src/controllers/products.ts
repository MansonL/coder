import { Request, Response } from 'express';
import { validSave, validUpdate,  generateCode, PRODUCT, generateID} from '../utils/utils';
import {productModel} from '../models/products';
import EErrors from '../common/EErrors';
import moment from 'moment'


const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } =
  productModel;

const { PropertiesIncorrect , IdIncorrect, NoProducts, ProductNotFound } = EErrors

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: PRODUCT[] = await getProducts();
    res.json({ data: products });
  } catch (e) {
    res.status(404).json(e);
  }
};
const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    if(id !== ''){
    const product: PRODUCT = await getProduct(id);
    res.json({ data: product });
    }else{
      throw {error: IdIncorrect, message: 'Please, type a valid id...'}
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
const saveProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (validSave(req.body)) {
      const product : PRODUCT = {
          id: generateCode(),
          code: generateID(),
          timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
          ...req.body
      };
      const result = await addProduct(product);
      res.json(result);
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
   const result = await updateProduct(id, newProperties);
   if(result) res.json(result)
   }else{
   throw {error: PropertiesIncorrect, message: "Please, set your products properties correctly or input a valid id..."}
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