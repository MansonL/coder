import axios from "axios";
import { useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";

export function DBProducts () {
    const [products, setProducts] = useState<IMongoProduct[]>([]);
    const [noProducts, setNoProducts] = useState(false);

    const updateProducts = (newProducts: IMongoProduct[] | IMongoCartProduct[]) => {
      setProducts([...products, ...newProducts as IMongoProduct[]])
    }

    socket.on('products', async () => {
        const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
        console.log(`Products received`);
        setProducts(products)
        if(products.length === 0){
          setNoProducts(true);
        }else{
          setNoProducts(false);
        }
      })

      return (
        <Products updateProducts={updateProducts} products={products} type="normal" noProducts={noProducts}/>
    )
}


