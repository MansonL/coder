import { useState } from 'react'
import './products.css'
import { IMongoCartProduct, IMongoProduct } from '../../../server/src/interfaces/interfaces'
import { socket } from '../lib/socket'
import axios from 'axios'

interface ProductsProp {
    type: string
}

export function Products(props: ProductsProp) {
    const [products, setProducts] = useState<IMongoProduct[] | IMongoCartProduct[]>([])
    
    /**
     * 
     * The sockets were emitted at Main component.
     * Here are the handlers for the backend sockets.
     * 
     */
    
    /* Need to modify the view for getting the number of products to be shown.
    socket.on('randomProducts', async () => {
      const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
    })
    */
    socket.on('products', async () => {
      const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
    });
    console.log(`Products received`);
      setProducts(products)

    socket.on('cart', async () => {
      const cartProducts: IMongoCartProduct[] = await (await axios.get<IMongoCartProduct[]>('http://localhost:8080/cart/list')).data;
      console.log(`Cart Products received`);
      setProducts(cartProducts)
    })

    return (
        <>
        <header>
      <div className="title">
        <h4>{props.type === 'cart' ? 'Cart List' : 'Products List'}</h4>
      </div>
    </header>
    <div className="products-body">
      {products.map((product, idx) => {
          return (
            <div key={idx}>
            <div className="product">
              <img src={product.img}/>
              <div className="product-description">
                <span className="product-title">{product.title}</span>
                <span className="product-price">{product.price}</span>
              </div>
            </div><hr className="products-hr" />
            </div>
          )
      })}
    </div>
  </>
    )
}