import axios from "axios";
import { useEffect, useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";
import React from "react";

export function DBProducts () {
    const [products, setProducts] = useState<IMongoProduct[]>([]);
    const [noProducts, setNoProducts] = useState(true);

    const updateProducts = (newProducts: IMongoProduct[] | IMongoCartProduct[] | []) => {
      setProducts(newProducts);
      if(newProducts.length > 0 && noProducts) setNoProducts(false)
    }

    const updateListener = async () => {
      try {
        const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
        console.log(`Products received`);
        setProducts(newProducts)
        setNoProducts(false);  
      } catch (error) {
        console.log(`Error produced ${error}`)
        setNoProducts(true);
      }  
      }

    useEffect(() => {
      socket.on('productsUpdate', updateListener);
      return () => {socket.off('productsUpdate', updateListener)}
    })

      return (
        <React.Fragment>
        <Products updateProducts={updateProducts} products={products} type="normal" noProducts={noProducts}/>
        </React.Fragment>
    )
}


