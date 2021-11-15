import axios from "axios";
import { useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";

export function DBProducts () {
    const [products, setProducts] = useState<IMongoProduct[]>([]);
    const [noProducts, setNoProducts] = useState(true);

    const updateProducts = (newProducts: IMongoProduct[] | IMongoCartProduct[]) => {
      setProducts(newProducts);
      if(newProducts.length > 0 && noProducts) setNoProducts(false)
    }

    socket.on('products', async () => {
      try {
        const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
        console.log(`Products received`);
        setProducts(newProducts)
        setNoProducts(false);  
      } catch (error) {
        console.log(`Error produced ${error}`)
        setNoProducts(true);
      }  
      })

      return (
        <Products updateProducts={updateProducts} products={products} type="normal" noProducts={noProducts}/>
    )
}


