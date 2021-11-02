import React, { useState } from 'react'
import './products.css'
import { IMongoCartProduct, IMongoProduct, IQuery } from '../../../server/src/interfaces/interfaces'
import { socket } from '../lib/socket'
import axios from 'axios'

interface ProductsProp {
    type: string
}

export function Products(props: ProductsProp) {
    const [products, setProducts] = useState<IMongoProduct[] | IMongoCartProduct[]>([])
    const [filters, setFilters] = useState<IQuery>({
      title: '',
      code: '',
      price: {
        minPrice: 0,
        maxPrice: 0,
      },
      stock: {
        minStock: 0,
        maxStock: 0,
      }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters({
          ...filters,
          [e.target.name]: value
        });
    }

    /**
     * 
     * The sockets were emitted at Main component.
     * Here are the handlers for the backend sockets.
     * 
     */
    
    
    socket.on('randomProducts', async () => {
      const products: IMongoProduct[] = await (await axios.get<IMongoProduct[]>('http://localhost:8080/products/list')).data
    })
    
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
      <h6>{`Showing ${products.length} results.`}</h6>
      <div className="filters">
        <button className="filter-btn">Filters</button>
        <div className="filter-dropdown">

          <label htmlFor="title" className="filter-label">Title</label>
          <input type="text" id="title" className="filter-input" onChange={handleChange} />

          <label htmlFor="code" className="filter-label">Code</label>
          <input type="text" id="code" className="filter-input" onChange={handleChange} />
          <br />
          <label className=".filter-label">Price</label>
          <div className="price">
            <input type="number" min="0.1" step="0.05" id="minPrice" className="number-input" onChange={handleChange} placeholder="Min" />
            <input type="number" min="0.1" step="0.05" id="maxPrice" className="number-input" onChange={handleChange} placeholder="Max" />
          </div>
          <label className="filter-label">Stock</label>
          <div className="stock">
            <input type="number" min="0" id="minStock" className="number-input" onChange={handleChange} placeholder="Min" /><input type="number" min="0" id="maxStock" className="number-input" onChange={handleChange} placeholder="Max" />
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