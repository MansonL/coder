import { useState } from 'react'
import './products.css'
import 
interface ProductsProp {
    type: string
}

export function Products({type: string}: ProductsProp) {
    const [products, setProducts] = useState([])
    
    return (
        <>
        <header>
      <div className="title">
        <h4>Products List</h4>
      </div>
    </header>
    <div className="products-body">
      {products.map(product => {

      })}
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      <div className="product">
          <img src="https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt=""/>
        <div className="product-description">
          <span className="product-title">HARRIS FARMS CERAMIC NESTING EGGS WHITE</span><br/>
          <span className="product-price">$ 4019.16</span>
        </div>
      </div><hr className="products-hr"/>
      
    </div>
  </>
    )
}