const validSave = (body : FORM_DATA) => {
    const {title, description, code, img, stock, price} = body;
    return title !== '' && description !== '' && code !== '' && img !== '' && !isNaN(price) && !isNaN(stock) 
  };


const validUpdate = (body: FORM_DATA) => {
   const {title, description, code, img, stock, price} = body;
   return title !== '' || description !== '' || code !== '' || img !== '' || !isNaN(stock) || isNaN(stock) || isNaN(price);
}

interface FORM_DATA {
    title: string,
    description: string, 
    code: string,
    img: string,
    stock: number,
    price: number
}


const generateID = () : string => {
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

const findProduct = (products : PRODUCT[], id : string): PRODUCT | undefined => {
    return products.find((product : PRODUCT) : boolean => product.id === id)
}



export { validSave, validUpdate,  generateID, PRODUCT, findProduct }