import { connect, Model } from 'mongoose';
import { models, atlasURI, mongoURI } from './models';
import {
    DBProductsClass,
    INew_Product,
    IMongoProduct,
    CUDResponse,
    IUpdate,
    IQuery,
} from '../../../interfaces/interfaces';
import { mockProducts } from '../../mockProducts';
import moment from 'moment';
import { utils } from '../../../common/utils';

export class MongoProducts implements DBProductsClass {
    private products: Model<INew_Product>;
    private uri: string;
    constructor(type: string) {
        this.products = models.products;
        if (type === 'Atlas') {
            this.uri = atlasURI;
        } else {
            this.uri = mongoURI;
        }
        this.init();
    }
    async init(): Promise<void> {
        await connect(this.uri);
        console.log(`Mongo Connected`);
        await this.products.deleteMany({});
        await this.products.insertMany(mockProducts);
        console.log(`Mock data inserted `);
    }
    async get(id?: string | undefined): Promise<IMongoProduct[] | []> {
        if (id != null) {
            const docs = await this.products.find({ _id: id });
            if (docs.length > 0) {
                const product: IMongoProduct[] =
                    utils.extractMongoProducts(docs);
                return product;
            }
            return [];
        } else {
            const docs = await this.products.find({});
            if (docs.length > 0) {
                const products: IMongoProduct[] =
                    utils.extractMongoProducts(docs);
                return products;
            }
            return [];
        }
    }
    async add(product: INew_Product): Promise<CUDResponse> {
        const doc = await this.products.create(product);
        const result: IMongoProduct = utils.extractMongoProducts([doc])[0];
        return {
            message: `Product successfully saved.`,
            data: result,
        };
    }
    async update(id: string, data: IUpdate): Promise<CUDResponse> {
        const doc = await this.products.find({ _id: id });
        const product: IMongoProduct = utils.extractMongoProducts(doc)[0];
        const newProduct = { ...product, ...data };
        newProduct.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(newProduct);
        await this.products.replaceOne({ _id: id }, newProduct);
        return {
            message: `Product successfully updated.`,
            data: newProduct,
        };
    }
    async delete(id: string): Promise<CUDResponse> {
        const deletedDoc = await this.products.find({ _id: id });
        const deletedProduct: IMongoProduct =
            utils.extractMongoProducts(deletedDoc)[0];
        await this.products.deleteOne({ _id: id });
        return {
            message: `Product successfully deleted`,
            data: deletedProduct,
        };
    }
    
    async query(options: IQuery): Promise<IMongoProduct[] | []> {
        const titleRegex =
            options.title === ''
                ? new RegExp(`.*`)
                : new RegExp(`(${options.title})`);
        const codeRegex =
            options.code === ''
                ? new RegExp(`.*`)
                : new RegExp(`(${options.code})`);
        const doc = await this.products.find({
            title: { $regex: titleRegex },
            code: { $regex: codeRegex },
            price: {
                $gte: options.price.minPrice,
                $lte: options.price.maxPrice,
            },
            stock: {
                $gte: options.stock.minStock,
                $lte: options.stock.maxStock,
            },
        });
        console.log(doc);
        if (doc.length > 0) {
            const products: IMongoProduct[] = utils.extractMongoProducts(doc);
            return products;
        } else {
            return [];
        }
    }
}
