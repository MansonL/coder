import React, { useEffect, useRef, useState } from 'react'
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

    const handleFilterApply = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        const products: IMongoProduct[] = (await axios.get<IMongoProduct[]>('http://localhost:8080/products/query', {data: filters})).data;
        setProducts(products);
    }

    const [showFilters, setShowFilters] = useState(false);
    const filterDropdown = useRef(null);
    const filterBtn = useRef(null);
    const filterDropdownClassName = showFilters ? 'filter-dropdown showMenu' : 'filter-dropdown';

    const handleFilterClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
      if(showFilters){
        setShowFilters(false);
      }else{
        setShowFilters(true)
      }
    }

    const handleAddProduct = () => {

    }

    const handleRemoveProduct = () => {

    }

    useEffect(() => {
      document.addEventListener('click', (ev: MouseEvent) => {
        if(filterDropdown && filterBtn && ev.target){
            if(ev.target != filterDropdown.current && ev.target != filterBtn.current){
              if(showFilters) setShowFilters(false)
            }
          }
      })
    })

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
        /*
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
            <li className="product">
              <li><img className='product-img' src={product.img}/></li>
              <li className="product-description">
                <span className="product-title">{product.title}</span>
                <span className="product-price">{product.price}</span>
              </li>
              <li className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct()}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct()}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </li>
            </li><hr className="products-hr" />
            </li>
          )
      })}
    </div>
  </>
    */
   <>
   <header>
<div className="title">
  <h4>Products List</h4>
</div>
</header>
<div className="upper-body">
<h6>Showing 0 results.</h6>
<div className="filters">
  <button className="filter-btn" ref={filterBtn} onClick={handleFilterClick}>Filters</button>
  <div className={filterDropdownClassName} ref={filterDropdown}>

    <label htmlFor="title" className="filter-label">Title</label><br/>
    <input type="text" id="title" className="filter-input" onChange={handleChange} /><br/>

    <label htmlFor="code" className="filter-label">Code</label><br/>
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
    <div className="apply">
      <button className="apply-filter" onClick={handleFilterApply}> Apply</button>
    </div>
  </div>
</div>
</div>
<div className="products-body">
            <li className="product">
              <img className='product-img' src='https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff'/>
              <li className="product-description">
                <span className="product-title">Beef Choice Angus Rump Roast, 2.25 - 3.87 lb</span><br/>
                <span className="product-price">399.25</span>
              </li>
              <li className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct()}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct()}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button> 
        </li>
            </li><hr className="products-hr" />
      <li className="product">
              <img className='product-img' src='https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff'/>
              <li className="product-description">
                <span className="product-title">Beef Choice Angus Rump Roast, 2.25 - 3.87 lb</span><br/>
                <span className="product-price">399.25</span>
              </li>
              <li className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct()}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct()}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </li>
            </li><hr className="products-hr" />
      <li className="product">
              <img className='product-img' src='https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff'/>
              <li className="product-description">
                <span className="product-title">Beef Choice Angus Rump Roast, 2.25 - 3.87 lb</span><br/>
                <span className="product-price">399.25</span>
              </li>
              
        <li className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct()}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct()}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </li>
            </li><hr className="products-hr" />
      <li className="product">
              <img className='product-img' src='https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff'/>
              <li className="product-description">
                <span className="product-title">Beef Choice Angus Rump Roast, 2.25 - 3.87 lb</span><br/>
                <span className="product-price">399.25</span>
              </li>
              <li className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct()}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct()}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </li>
        
            </li><hr className="products-hr" />
      
      
            </div>
        </>
  )
}

