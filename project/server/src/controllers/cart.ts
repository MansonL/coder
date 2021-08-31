import cartModel from "../models/cart";
import { Request, Response } from "express";
import { PRODUCT } from "../utils";
import EErrors from "../common/EErrors";

const {IdIncorrect} = EErrors;

const { getOne, getAll, add, deleteProduct} =
  cartModel;

const getProduct = async (req:Request, res:Response) => {
    try {
     const id = req.params.id;
     if(id !== ''){
        const result : PRODUCT = await getOne(id);
        if(result != null) res.json({data: result})
     }else{
        throw { error: IdIncorrect, message: "Please, type a valid id..."}
     }   
    } catch (e) {
       throw e
    }
}

const getCart = async (req:Request, res:Response) => {
    try {
      const result : PRODUCT[] = await getAll();
      if(result != null) res.json({data:result});
  } catch (e) {
      throw e
  }
}

const addToCart = async (req:Request, res:Response) => {
    try {
      const id = req.params.id;
     if(id !== ''){
    
     }else{
       
     } 
  } catch (e) {
    
  }
}

const deleteFromCart = async (req:Request, res:Response) => {
    try {
      const id = req.params.id;
     if(id !== ''){
    
     }else{
       
     } 
  } catch (e) {
    
  }
}

export { getProduct, getCart, addToCart, deleteFromCart }