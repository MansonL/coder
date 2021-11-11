import axios from "axios";
import { useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";

export function RandomProducts () {
    const [products, setProducts] = useState<IMongoProduct[] | IMongoCartProduct[]>([]);
    const [noProducts, setNoProducts] = useState(false);

    const updateProducts = (products: IMongoProduct[] | IMongoCartProduct[]) => {
        setProducts(products)
    }

    socket.on('randomProducts', async () => {
        const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
      })

    return (
        <Products updateProducts={updateProducts} products={products} type="cart" noProducts={noProducts}/>
    )
}