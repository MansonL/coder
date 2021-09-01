import cartModel from '../models/cart';
import { Request, Response } from 'express';
import { PRODUCT } from '../utils/utils';
import EErrors from '../common/EErrors';

const { IdIncorrect, NoProducts, ProductNotFound } = EErrors;

const { getOne, getAll, add, deleteProduct } = cartModel;

const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id !== '') {
      const result: PRODUCT = await getOne(id);
      res.json({ data: result });
    } else {
      throw { error: IdIncorrect, message: 'Please, type a valid id...' };
    }
  } catch (e) {
    res.status(400).json(e);
};
}

const getCart = async (req: Request, res: Response) => {
  try {
    const result: PRODUCT[] = await getAll();
    if (result != null) {
      res.json({ data: result });
    } else {
      throw { error: NoProducts, message: 'No products added to the cart...' };
    }
  } catch (e) {
    res.status(404).json(e)
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if(id !== ''){
      const result = await add(id);
      res.json({data: result});
    }else{
      throw {error: IdIncorrect, message:"Wrong id"}
    } 
  } catch (e) {
    res.status(422).json(e)
  }
};

const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id !== '') {
      const result: { message: string; data: PRODUCT } = await deleteProduct(
        id
      );
      res.json({data: result})
      } else {
        throw {
          error: IdIncorrect,
          message: "Wrong id.",
        };
      }
  } catch (e) {
    res.status(422).json(e)
  }
};

export { getProduct, getCart, addToCart, deleteFromCart };
