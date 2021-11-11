import React, { useEffect, useRef, useState } from 'react'
import './products.css'
import { CUDResponse, IMongoCartProduct, IMongoProduct, IQuery } from '../../../server/src/interfaces/interfaces'
import { socket } from '../lib/socket'
import axios from 'axios'
import { hasProductOrEmpty, whichUpdate } from '../utils/utilities'

interface ProductsProp {
    products: IMongoProduct[] | IMongoCartProduct[];
    updateProducts: (products: IMongoProduct[] | IMongoCartProduct[]) => void
    type: string;
    noProducts: boolean;
}

export function Products(props: ProductsProp) {
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

    const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters({
          ...filters,
          [e.target.name]: value
        });
    }

    const handleFilterApply = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        const products: IMongoProduct[] = (await axios.get<IMongoProduct[]>('http://localhost:8080/products/query', {data: filters})).data;
        props.updateProducts(products)
    }

    const [showFilters, setShowFilters] = useState(false);
    const filterDropdown = useRef<HTMLDivElement>(null);
    const filterBtn = useRef<HTMLButtonElement>(null);
    const filterDropdownClassName = showFilters ? 'filter-dropdown showMenu' : 'filter-dropdown';

    const handleFilterClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
      if(showFilters){
        setShowFilters(false);
      }else{
        setShowFilters(true)
      }
    }

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showOperationResult, setShowOperationResult] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [operationType, setOperationType] = useState('');
    const [saveCode, setCode] = useState('');

    const resultOperationStyle = operationType === 'failure' ? 'result-error' : 'result-success';

    const handleAddProduct = async (code: string) => {
      setCode(code);
      const result : CUDResponse = await (await axios.post<CUDResponse>(`http://localhost:8080/cart/add/${saveCode}`)).data;
      setShowOperationResult(true);
      if(hasProductOrEmpty(result.data as IMongoProduct | [])){
          setOperationType('success');
          setResultMessage(result.message)
          await whichUpdate(props.type)
      }else{
          setOperationType('failure');
          setResultMessage(result.message)
      }
    }

    const handleRemoveProduct = (code: string) => {
      setCode(code);
      setShowConfirmation(true);
    }

    const handleCancel = () => {
      setShowConfirmation(false);
    }

    const handleDelete = async () => {
      /**
       * 
       * Here we check if we are showing the cart products or the products on the DB,
       * and based on that condition we are going to delete products from the cart or from the DB
       * 
       */
      const url = props.type === 'cart' ? `http://localhost:8080/cart/delete/${saveCode}` : `http://localhost:8080/products/delete/${saveCode}`;
      const result : CUDResponse = await (await axios.delete<CUDResponse>(url)).data;
      setShowOperationResult(true);
      if(hasProductOrEmpty(result.data as IMongoProduct | [])){
          setOperationType('success');
          setResultMessage(result.message);
          await whichUpdate(props.type)
      }else{
          setOperationType('failure');
          setResultMessage(result.message)
      }
      
    }

    const handleAlertEnd = (ev: React.AnimationEvent<HTMLDivElement>) => {
      setShowOperationResult(false);
      setResultMessage('');
      setShowConfirmation(false);
    }

    useEffect(() => {
      document.addEventListener('click', (ev: MouseEvent) => {
        if(filterDropdown.current && filterBtn.current && ev.target){
            if(ev.target != filterBtn.current && !filterDropdown.current.contains(ev.target as Node)){
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
    
    
    
    
    
    

    

    return (
        
        <>
        {showConfirmation && <div className="alert-container">
  <div className="alert">
    <div className="alert-header">
      <h3 className="alert-title">Warning!</h3>
      <button className="result-btn" onClick={handleCancel}><i className="fas fa-times"></i>
      </button>
    </div>
    <div className="alert-body">
      <span>Are you sure you want to delete the selected item?</span>
    </div>
    <div className="alert-bottom">
      <button className="alert-btn" onClick={handleCancel}>Cancel</button>
      <button className="alert-btn" onClick={handleDelete}>Delete</button>
    </div>
  </div>
  </div>
}
{
  showOperationResult && <div className="alert-container">
  <div className={resultOperationStyle} onAnimationEnd={handleAlertEnd}>
  <span className="result-message">{operationType === 'failure' ?  'A problem occured!' : 'Successfully!'}</span>
    <p className="result-code">{resultMessage}</p>
</div>
</div>
}
        <header>
      <div className="title">
        <h4>Products List</h4>
      </div>
    </header>
    <div className="upper-body">
      <h6>{`Showing ${props.products.length} results.`}</h6>
      <div className="filters">
        <button className="filter-btn" onClick={handleFilterClick} ref={filterBtn}>Filters</button>
        <div className={filterDropdownClassName} ref={filterDropdown}>

          <label htmlFor="title" className="filter-label">Title</label><br/>
          <input type="text" id="title" className="filter-input" onChange={handleFiltersChange} />
          <br/>
          <label htmlFor="code" className="filter-label">Code</label><br/>
          <input type="text" id="code" className="filter-input" onChange={handleFiltersChange} />
          <br />
          <label className=".filter-label">Price</label>
          <div className="price">
            <input type="number" min="0.1" step="0.05" id="minPrice" className="number-input" onChange={handleFiltersChange} placeholder="Min" />
            <input type="number" min="0.1" step="0.05" id="maxPrice" className="number-input" onChange={handleFiltersChange} placeholder="Max" />
          </div>
          <label className="filter-label">Stock</label>
          <div className="stock">
            <input type="number" min="0" id="minStock" className="number-input" onChange={handleFiltersChange} placeholder="Min" /><input type="number" min="0" id="maxStock" className="number-input" onChange={handleFiltersChange} placeholder="Max" />
          </div>
          <div className="apply">
      <button className="apply-filter" onClick={handleFilterApply}> Apply</button>
    </div>
        </div>
    </div>
  </div>
    <div className="products-body">
      {!props.noProducts ? props.products.map((product, idx) => {
          return (
            <div key={idx}>
            <div className="product">
              <img className='product-img' src={product.img}/>
              <div className="product-description">
                <span className="product-title">{product.title}</span>
                <span className="product-price">{product.price}</span>
              </div>
              <div className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct(product._id)}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct(product._id)}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </div>
            </div><hr className="products-hr" />
            </div>
          )
      })
      : <div className="form-error">
      <div className="result-top">
        <span className="result-header">Oops!</span>
        <button className="result-btn"><i className="fas fa-times"></i></button>
      </div>
      <div className="result-message">
        <span>There's no products stored...</span>
      </div>
    </div>}
    </div>
  </>
    /*
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
    <input type="text" id="title" className="filter-input" onChange={handleFiltersChange} /><br/>

    <label htmlFor="code" className="filter-label">Code</label><br/>
    <input type="text" id="code" className="filter-input" onChange={handleFiltersChange} />
    <br />
    <label className=".filter-label">Price</label>
    <div className="price">
      <input type="number" min="0.1" step="0.05" id="minPrice" className="number-input" onChange={handleFiltersChange} placeholder="Min" />
      <input type="number" min="0.1" step="0.05" id="maxPrice" className="number-input" onChange={handleFiltersChange} placeholder="Max" />
    </div>
    <label className="filter-label">Stock</label>
    <div className="stock">
      <input type="number" min="0" id="minStock" className="number-input" onChange={handleFiltersChange} placeholder="Min" /><input type="number" min="0" id="maxStock" className="number-input" onChange={handleFiltersChange} placeholder="Max" />
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
        </>*/
  )
}

