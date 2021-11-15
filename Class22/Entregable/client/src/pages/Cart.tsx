import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";

export function Cart () {
    const [products, setProducts] = useState<IMongoCartProduct[]>([]);
    const [noProducts, setNoProducts] = useState(true);

    const updateProducts = (newProducts: IMongoCartProduct[] | IMongoProduct[]) => {
        setProducts(newProducts as IMongoCartProduct[]);
        if(newProducts.length > 0 && noProducts) setNoProducts(false)
    }

    socket.on('cart', async () => {
      try {
        const newProducts: IMongoCartProduct[] = await (await axios.get<IMongoCartProduct[]>('http://localhost:8080/cart/list')).data;
        console.log(`Cart Products received`);
        setProducts(newProducts);
        setNoProducts(false)
      } catch (error) {
        console.log(`Error produced ${error}`)
        setNoProducts(true);       
      }  
      
      })

    return (
        <Products updateProducts={updateProducts} products={products} type="cart" noProducts={noProducts}/>
    )
}