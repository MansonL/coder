import axios from "axios";
import { useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";

export function RandomProducts () {
    const [products, setProducts] = useState<IMongoProduct[] | IMongoCartProduct[]>([]);
    const [noProducts, setNoProducts] = useState(false);

    socket.on('randomProducts', async (qty: number | undefined) => {
        try {
            if(qty != null){
                const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/test-view', {data: qty})).data
                console.log(`Products received`);
                setProducts(newProducts)
                setNoProducts(false);  
            }else{
                const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/test-view')).data
                console.log(`Products received`);
                setProducts(newProducts)
                setNoProducts(false);  
            }
          } catch (error) {
            console.log(`Error produced ${error}`)
            setNoProducts(true);
          }  
      })

    return (
        <Products updateProducts={undefined} products={products} type="random" noProducts={noProducts}/>
    )
}