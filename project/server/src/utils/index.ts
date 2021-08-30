const valid = (body : [title:string, price:string, thumbnail:string]) => {
    const [title,price, thumbnail] = body;
    return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != ''
  };

const generateID = () => {
    return `_${Math.random().toString(36).substr(2,9)}`;
}

interface PRODUCT {
    id: string,
    timestamp: string,
    title: string,
    description: string, 
    code: string,
    img: string,
    stock: number,
    price: number,
    
    
}

const findProduct = (products : PRODUCT[], id : string) => {
    return products.findIndex((product: PRODUCT) : boolean => product.id === id)
}


export { valid, generateID, PRODUCT, findProduct }