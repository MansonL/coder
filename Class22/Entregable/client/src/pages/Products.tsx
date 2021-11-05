import React, { useEffect, useRef, useState } from 'react'
import './products.css'
import { CUDResponse, IMongoCartProduct, IMongoProduct, IQuery } from '../../../server/src/interfaces/interfaces'
import { socket } from '../lib/socket'
import axios from 'axios'

interface ProductsProp {
    type: string
}
const mockProducts = 
[
  {
      title: 'Beef Choice Angus Rump Roast, 2.25 - 3.87 lb',
      description: `There's nothing like cooking from scratch, especially when you start with our Beef Choice Angus Rump Roast. Made with quality USDA Choice Angus beef our roast is a savory cut with natural tenderness and exceptional taste. `,
      img: `https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `HARRIS FARMS CERAMIC NESTING EGGS WHITE`,
      description: `Harris Farms CERAMIC NESTING EGGS-White. Use for encourage hens to lay eggs inside nesting box and determine if a hen is ready to lay. Discourage chickens from eating eggs and also used as a decorative item.`,
      img: `https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Great Value Long Grain Enriched Rice, 320 oz`,
      description: `Keep your body in optimal shape with the right food such as this Great Value Long-Grain Enriched Rice. This product is simply pure with absolutely no artificial flavors or colors added. This nutritious Great Value rice cooks quickly and efficiently on the stovetop or in a rice cooker and gives you premium quality for an excellent value. `,
      img: `https://i5.walmartimages.com/asr/77b5ab4d-14fd-4fb2-9cd6-8aa6c3f18e2e_1.f940b3bfded7a5a097c2b11887643144.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `John Soules Foods Chicken Fajitas, 16oz`,
      description: `John Soules Foods Fully Cooked Chicken Fajitas. It is important to us that all of our products are made with the same care and ingredients you would make for your family. At John Soules Foods our goal is to give you the best quality product we can make.`,
      img: `https://i5.walmartimages.com/asr/1f819423-8ce1-4491-a770-c11c61db4828_3.c23e25eeb6851afc1df99f6b6797777d.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Great Value Sliced Potatoes, 14.46 oz`,
      description: `Great Value Sliced Potatoes are a classic side dish loved by all. Our hearty, sliced potatoes cut time-consuming peeling out of the equation. Season with salt, pepper, garlic, and butter for a great-tasting nutritious side. Serve with your favorite meats and vegetables for a satisfying, healthy meal. `,
      img: `https://i5.walmartimages.com/asr/bcf482ca-ba05-453c-b45f-009aea81be51_2.2f62fa0b4cb05d2e4d507851f30b2fee.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Optimum Nutrition Gold Standard 100% Whey Protein Powder, Double Rich Chocolate, 24g Protein, 1.5 LB`,
      description: `Optimum Nutrition's Gold Standard 100% Whey is the Most Awarded, Best-Selling, Whey Protein Powder on the Planet.* Whey Protein Isolates are the purest and most expensive form of whey protein that exists. That's why they are the first ingredients you read on the Gold Standard 100% Whey label. By using Whey Protein Isolates as our primary protein source, we're able to pack in 24 grams of the purest protein with a lot less of the fat, lactose, and other stuff that you can do without.`,
      img: `https://i5.walmartimages.com/asr/8ffa2a27-ac9c-4c15-850f-b02d2f01ea3a.dd1fafe645a472790b658a602641c1ef.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Hass Avocados`,
      description: `Avocados aren’t just great-tasting fresh produce items, but they are a nutrient-dense food enjoyed around the world. Because of the creamy texture and mild flavor of Hass avocados, they are a versatile ingredient that can be used in many different types of recipes and dishes. `,
      img: `https://i5.walmartimages.com/asr/098962b7-7d67-4ff5-a3c9-047c430f8fea_1.5847cdd72fa776356460d77b0b3c9301.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Chicken of the Sea Skinless Boneless Wild Caught Pink Salmon Pouch, 5 oz`,
      description: `Pink Salmon, known for its mild taste, is caught from the cold, clear waters in Alaska. To protect the cleanest waters in the world, Chicken of the Sea Salmon is certified by the Marine Steward Ship Council (MSC), offering the highest quality, sustainable Salmon. `,
      img: `https://i5.walmartimages.com/asr/17da74f9-474f-45b2-8ff2-eba681041b26.c2c3b3e87cafd6533e4153a04e711459.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Hurst Hambeens 15 Bean Soup, Cajun, 20 oz`,
      description: `Make a delicious meal quickly and easily with this Hurst's HamBeens with Seasoning Packet Cajun 15 Bean Soup. It includes 20 oz of 15 different types of beans and a cajun seasoning packet. It offers a tasty and classic ham and bean soup recipe.Hurst's HamBeens with Seasoning Packet Cajun 15 Bean Soup, 20 oz:Hurst's cajun seasoning packetHigh fiber20 oz of low-fat soup.`,
      img: `https://i5.walmartimages.com/asr/a44d61bd-3921-44c0-be32-21512fcd7515_1.25ab65c7e29eaa575bd8f9d2ebc16fa0.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
  {
      title: `Ocean's Halo, Organic, Vegan, Gluten-free, Non-GMO, Sushi Nori, 1 oz.`,
      description: `Bring sushi night home with our full Sushi Nori seaweed sheets, perfect for making your own sushi rolls and hand rolls at home! Serve it with rice and your favorite toppings, like avocado or cucumbers, then pair it with our No Soy Sauce or Less Sodium No Soy Sauce for a perfect dipping combination!`,
      img: `https://i5.walmartimages.com/asr/4e9b2786-c9ea-44e7-8b31-5829eece3c29_1.f4f5370159c5409438cfaa0ecfd0e9e2.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff`,
      code: ``,
      timestamp: ``,
      price: 0,
      stock: 0,
  },
]

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

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [saveCode, setCode] = useState('');

    const handleAddProduct = async (code: string) => {
      setCode(code);
      const result : CUDResponse = await (await axios.post<CUDResponse>(`http://localhost:8080/cart/add/${saveCode}`)).data
    }

    const handleRemoveProduct = (code: string) => {
      setCode(code);
      setShowConfirmation(true);
    }

    const handleCancel = () => {
      setShowConfirmation(false);
    }

    const handleDelete = async () => {
      const result : CUDResponse = await (await axios.delete<CUDResponse>(`http://localhost:8080/products/delete/${saveCode}`)).data;
      
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
        <header>
      <div className="title">
        <h4>Products List</h4>
      </div>
    </header>
    <div className="upper-body">
      <h6>{`Showing ${mockProducts.length} results.`}</h6>
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
      {mockProducts.map((product, idx) => {
          return (
            <div key={idx}>
            <div className="product">
              <img className='product-img' src={product.img}/>
              <div className="product-description">
                <span className="product-title">{product.title}</span>
                <span className="product-price">{product.price}</span>
              </div>
              <div className="add-remove-btns">
        <button className="add-remove-icon" onClick={(e) => handleAddProduct(product.code)}><img className='add-icon' src="https://cdn1.iconfinder.com/data/icons/user-interface-44/48/Add-512.png" alt="add-icon" /></button>
<button className="add-remove-icon" onClick={(e) => handleRemoveProduct(product.code)}><img className='remove-icon' src="https://icons-for-free.com/iconfiles/png/512/cercle+close+delete+dismiss+remove+icon-1320196712448219692.png" alt="remove-icon" /></button>
        </div>
            </div><hr className="products-hr" />
            </div>
          )
      })}
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
        </>*/
  )
}

