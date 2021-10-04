import { NextFunction, Request, Response } from 'express';
import {
    IProduct,
    INew_Product,
    IUpdate,
    IQuery,
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
        const products: IProduct[] | [] = await productsApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (products.length > 0) res.status(200).send(products);
        next(ApiError.notFound(EErrors.NoProducts));
    }
    async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.id.validate(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const product: IProduct[] | [] = await productsApi.getProduct(id);
        if (product.length > 0) res.status(200).send(product);
        next(ApiError.notFound(EErrors.ProductNotFound));
    }
    async saveProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const product: INew_Product = req.body;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.newProduct.validate(product);
        if (error) next(ApiError.badRequest(EErrors.PropertiesIncorrect));
        const result = await productsApi.addProduct(product);
        res.status(200).send(result);
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
        const product: IProduct[] | [] = await productsApi.getProduct(id);
        if (product.length > 0) {
            product[0].timestamp = moment().format('MM/D/YYYY HH:mm:ss');
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
        const product: IProduct[] | [] = await productsApi.getProduct(id);
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
        title = title != null ? title : '';
        code = code != null ? code : '';
        minPrice = minPrice != null ? minPrice : '0.01';
        maxPrice =
            maxPrice != null
                ? maxPrice
                : (await utils.getMaxStockPrice('price')).toString();
        minStock = minStock != null ? minStock : '0';
        maxStock =
            maxStock != null
                ? maxStock
                : (await utils.getMaxStockPrice('stock')).toString();
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
        const { error } = validator.query.validate(options);
        if (error) {
            next(ApiError.badRequest(error.message)); // This is just for checking if there's an error in the query implementatio
        } else {
            const result: IProduct[] | [] = await productsApi.query(options);
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                next(ApiError.notFound(EErrors.NoProducts));
            }
        }
    }
}

export const p_controller = new ProductController();
