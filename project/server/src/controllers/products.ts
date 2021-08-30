import { Request, Response } from "express";
import { valid, generateID, PRODUCT, findProduct } from '../utils/index'
import productModel from "../models/products";

const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = productModel


const getAll = async (req: Request, res: Response) => {
    try {
        const products : PRODUCT[]  = await getProducts();
        if(products.length > 0) return res.json({ data: products })
    } catch (e) {
        res.status(404).json({error: e.Message, message: e.message})
    }
    
    
}
