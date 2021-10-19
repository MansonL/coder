import { useState } from 'react'
import './products.css'
import { IMongoProduct } from '../../../server/src/interfaces/interfaces'
import { socket } from '../lib/socket'

interface ProductsProp {
    type: string
}

export function Products(props: ProductsProp) {
    const [products, setProducts] = useState<IMongoProduct[]>([])
    
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