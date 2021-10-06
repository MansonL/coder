import { NextFunction, Request, Response } from 'express';
import { EErrors } from '../common/EErrors';
import {
    ICartProduct,
    IMongoProduct,
    IMongoCartProduct,
    IProduct,
} from '../models/products.interface';
import { cartApi } from '../apis/cartApi';
import { validator } from '../common/joi_schemas';
import { productsApi } from '../apis/productsApi';
import { ApiError } from '../common/ApiError';
import { utils } from '../utils/utils';
/**
 *
 * Cart Controller Class
 *
 */
class CartController {
    async getProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string | undefined = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validateAsync(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const result: ICartProduct[] | [] = await cartApi.getProduct(id);
        if (result.length > 0) res.status(200).send(result);
        next(ApiError.notFound(EErrors.ProductNotFound));
    }
    async getCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const result: ICartProduct[] | [] = await cartApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (result.length !== 0) {
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EErrors.NoProducts));
        }
    }

    async addToCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const productID: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validate(productID);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const products: IProduct[] | IMongoProduct[] | [] =
            await productsApi.getProduct(productID);
        if (products.length > 0) {
            if (utils.isMongo(products[0])) {
                const { _id, ...product } = products[0];
                const results = await cartApi.addProduct(
                    _id.toString(),
                    product
                );
                res.status(200).send(results);
            } else {
                const { id, ...product } = products[0];
                const results = await cartApi.addProduct(
                    id.toString(),
                    product
                );
                res.status(200).send(results);
            }
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
    }

    async deleteFromCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validate(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const product: ICartProduct[] | IMongoCartProduct[] | [] =
            await cartApi.getProduct(id);
        if (product.length > 0) {
            const result = await cartApi.deleteProduct(id);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
    }
}

export const c_controller = new CartController();
