import { Request, NextFunction, Response } from 'express';
import { ApiError } from '../utils/errorApi';
import { EProductsErrors } from '../common/EErrors';
import { productsApi } from '../api/products';
import { IMongoProduct, INew_Product, IQuery, IUpdate } from '../interfaces/interfaces';
import { validator } from '../utils/joiSchemas';
import { utils } from '../common/utils';


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
        const products: IMongoProduct[] | [] = await productsApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (products.length > 0) {
            res.status(200).send(products);
        } else {
            next(ApiError.notFound(EProductsErrors.NoProducts));
        }
    }
    async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validateAsync(id);
        if (error) {
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        } else {
            const product: IMongoProduct[] | [] = await productsApi.getProduct(
                id
            );
            if (product.length > 0) {
                res.status(200).send(product);
            } else {
                next(ApiError.notFound(EProductsErrors.ProductNotFound));
            }
        }
    }
    async getTest(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const qty = req.query.qty;
        if(qty != null){
            const quantity = Number(qty);
            const randomProducts = utils.generateRandomProducts(quantity);
            res.status(200).send(randomProducts);
        }else{
            const randomProducts = utils.generateRandomProducts(10);
            res.status(200).send(randomProducts);
        }
        
    }
    async save(req: Request, res: Response, next: NextFunction): Promise<void> {
        const product: INew_Product = req.body;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.newProduct.validateAsync(product);
        console.log(error);
        if (error) {
            next(ApiError.badRequest(EProductsErrors.PropertiesIncorrect));
        } else {
            const result = await productsApi.addProduct(product);
            res.status(200).send(result);
        }
    }
    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        const newProperties: IUpdate = req.body;
        const resultID = await validator.id.validateAsync(id);
        const resultProps = await validator.update.validateAsync(newProperties);
        if (resultID.error)
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        if (resultProps.error)
            next(ApiError.badRequest(EProductsErrors.PropertiesIncorrect));
        const product: IMongoProduct[] | [] = await productsApi.getProduct(id);
        if (product.length > 0) {
            const result = await productsApi.updateProduct(id, newProperties);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EProductsErrors.ProductNotFound));
        }
        console.log(`[PATH] Inside controller.`);
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validateAsync(id);
        if (error) next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        const product: IMongoProduct[] | [] = await productsApi.getProduct(id);
        if (product.length > 0) {
            const result = await productsApi.deleteProduct(id);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EProductsErrors.ProductNotFound));
        }
    }

    async query(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        let { title, code, minPrice, maxPrice, minStock, maxStock } = {
            title: req.query.title as string,
            code: req.query.code as string,
            minPrice: req.query.minPrice as string,
            maxPrice: req.query.maxPrice as string,
            minStock: req.query.minStock as string,
            maxStock: req.query.maxStock as string,
        };
        const products: IMongoProduct[] | [] = await productsApi.getProduct();
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
            const { error } = await validator.query.validateAsync(options);
            if (error) {
                next(ApiError.badRequest(error.message)); // This is just for checking if there's an error in the query implementation
            } else {
                const result: IMongoProduct[] | [] = await productsApi.query(
                    options
                );
                if (result.length > 0) {
                    res.status(200).send(result);
                } else {
                    next(ApiError.notFound(EProductsErrors.NoProducts));
                }
            }
        } else {
            next(ApiError.notFound(`No products matching the query`));
        }
    }
    
}

export const products_controller = new ProductController();
