import { NextFunction, Request, Response } from 'express';
import {
    IProduct,
    INew_Product,
    IUpdate,
    IQuery,
    IMongoProduct,
} from '../models/products.interface';
import { productsApi } from '../apis/productsApi';
import { EErrors } from '../common/EErrors';
import { validator } from '../common/joi_schemas';
import moment from 'moment';
import { ApiError } from '../common/ApiError';
import { utils } from '../utils/utils';

/**
 *
 * Product Controller Class
 *
 */
class ProductController {
    async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const products: IProduct[] | IMongoProduct[] | [] =
            await productsApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (products.length > 0) {
            res.status(200).send(products);
        } else {
            next(ApiError.notFound(EErrors.NoProducts));
        }
    }
    async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.id.validate(id);
        if (error) {
            next(ApiError.badRequest(EErrors.IdIncorrect));
        } else {
            const product: IProduct[] | IMongoProduct[] | [] =
                await productsApi.getProduct(id);
            if (product.length > 0) {
                res.status(200).send(product);
            } else {
                next(ApiError.notFound(EErrors.ProductNotFound));
            }
        }
    }
    async saveProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const product: INew_Product = req.body;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.newProduct.validate(product);
        console.log(error);
        if (error) {
            next(ApiError.badRequest(EErrors.PropertiesIncorrect));
        } else {
            const result = await productsApi.addProduct(product);
            res.status(200).send(result);
        }
    }
    async updateProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        const newProperties: IUpdate = req.body;
        const resultID = validator.id.validate(id);
        const resultProps = validator.update.validate(newProperties);
        if (resultID.error) next(ApiError.badRequest(EErrors.IdIncorrect));
        if (resultProps.error)
            next(ApiError.badRequest(EErrors.PropertiesIncorrect));
        const product: IProduct[] | IMongoProduct[] | [] =
            await productsApi.getProduct(id);
        if (product.length > 0) {
            const result = await productsApi.updateProduct(id, newProperties);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
        console.log(`[PATH] Inside controller.`);
    }

    async deleteProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.id.validate(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const product: IProduct[] | IMongoProduct[] | [] =
            await productsApi.getProduct(id);
        if (product.length > 0) {
            const result = await productsApi.deleteProduct(id);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
    }
    async query(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        let { title, code } = {
            title: req.query.title as string,
            code: req.query.code as string,
        };
        let { minPrice, maxPrice, minStock, maxStock } = req.query;
        const products: IProduct[] | IMongoProduct[] | [] =
            await productsApi.getProduct();
        if (products.length > 0) {
            title = title != null ? title : '';
            code = code != null ? code : '';
            minPrice = minPrice != null ? minPrice : '0.01';
            maxPrice =
                maxPrice != null
                    ? maxPrice
                    : (
                          await utils.getMaxStockPrice(products, 'price')
                      ).toString();
            minStock = minStock != null ? minStock : '0';
            maxStock =
                maxStock != null
                    ? maxStock
                    : (
                          await utils.getMaxStockPrice(products, 'stock')
                      ).toString();
            const options: IQuery = {
                title: title,
                code: code,
                price: {
                    minPrice: Number(minPrice),
                    maxPrice: Number(maxPrice),
                },
                stock: {
                    minStock: Number(minStock),
                    maxStock: Number(maxStock),
                },
            };
            console.log(options);
            const { error } = validator.query.validate(options);
            if (error) {
                next(ApiError.badRequest(error.message)); // This is just for checking if there's an error in the query implementatio
            } else {
                const result: IMongoProduct[] | IProduct[] | [] =
                    await productsApi.query(options);
                if (result.length > 0) {
                    res.status(200).send(result);
                } else {
                    next(ApiError.notFound(EErrors.NoProducts));
                }
            }
        } else {
            next(ApiError.notFound(EErrors.NoProducts));
        }
    }
}

export const p_controller = new ProductController();
