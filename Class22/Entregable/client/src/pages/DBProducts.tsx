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
        const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
        console.log(`Products received`);
        setProducts(newProducts)
        if(newProducts.length === 0){
          setNoProducts(true);
        }else{
          setNoProducts(false);
        }
      })

      return (
        <Products updateProducts={updateProducts} products={products} type="normal" noProducts={noProducts}/>
    )
}


