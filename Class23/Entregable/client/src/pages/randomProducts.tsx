import axios from "axios";
import { useEffect, useState } from "react";
import { IMongoCartProduct, IMongoProduct } from "../../../server/src/interfaces/interfaces";
import { socket } from "../lib/socket";
import { Products } from "./Products";
import React from "react";

export function RandomProducts () {
    const [products, setProducts] = useState<IMongoProduct[] | IMongoCartProduct[]>([]);
    const [noProducts, setNoProducts] = useState(false);
            
    const updateListener = async (qty: string) => {
        try {
            if(qty !== ''){
                const newProducts: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/test-view', {params: {qty: qty}})).data
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
    }

    useEffect(() => {
        socket.emit('randomProducts');
        socket.on('randomProductsUpdate', updateListener);
        return () => { socket.off('randomProductsUpdate', updateListener) }
    }, [products])

    return (
        <React.Fragment>
        <Products updateProducts={undefined} products={products} type="random" noProducts={noProducts}/>
        </React.Fragment>
    )
}