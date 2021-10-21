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
     * Here are the handlers htmlFor the backend sockets.
     * 
     */
    
    /* Need to modify the view htmlFor getting the number of products to be shown.
    socket.on('randomProducts', async () => {
      const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
    })
    */
    socket.on('products', async () => {
      const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
      console.log(`Products received`);
      setProducts(products)
    });
    

    socket.on('cart', async () => {
      const cartProducts: IMongoCartProduct[] = await (await axios.get<IMongoCartProduct[]>('http://localhost:8080/cart/list')).data;
      console.log(`Cart Products received`);
      setProducts(cartProducts)
    })

    return (
        <>
        <header>
      <div className="title">
        <h4>Products List</h4>
      </div>
    </header>
    <div className="upper-body">
      <h6>Showing 0 results of 0</h6>
      <div className="filters">
        <button className="filter-btn">Filters</button>
        <div className="filter-dropdown">

          <label htmlFor="title" className="filter-label">Title</label>
          <input type="text" id="title" className="filter-input" />

          <label htmlFor="code" className="filter-label">Code</label>
          <input type="text" id="code" className="filter-input" />
          <br />
          <label className=".filter-label">Price</label>
          <div className="price">
            <input type="number" min="0.1" step="0.05" id="minPrice" className="number-input" placeholder="Min" />
            <input type="number" min="0.1" step="0.05" id="maxPrice" className="number-input" placeholder="Max" />
          </div>
          <label className="filter-label">Stock</label>
          <div className="stock">
            <input type="number" min="0" id="minStock" className="number-input" placeholder="Min" /><input type="number" min="0" id="maxStock" className="number-input" placeholder="Max" />
          </div>
        </div>
    </div>
  </div>
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