import { NextFunction, Request, Response } from 'express';
import {
    IProduct,
    INew_Product,
    IQueryOrUpdate,
} from '../models/products.interface';
import { productsApi } from '../apis/productsApi';
import { EErrors } from '../common/EErrors';
import { validator } from '../common/joi_schemas';
import moment from 'moment';
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
        const properties: INew_Product = req.body;
        console.log(`[PATH] Inside controller.`);
        const { error } = validator.newProduct.validate(properties);
        if (error) next(ApiError.badRequest(EErrors.PropertiesIncorrect));
        const product = {
            timestamp: moment().format('MM/D/YYYY HH:mm:ss'),
            code: utils.generateCode(),
            ...properties,
        };
        const result = await productsApi.addProduct(product);
        res.status(200).send(result);
    }
    async updateProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        const newProperties: IQueryOrUpdate = req.body;
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
        const options = req.body;
        const {error} = validator.
    }
}

export const p_controller = new ProductController();
