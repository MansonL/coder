const validSave = (body : FORM_DATA) => {
    const {title, description, img, stock, price} = body;
    return title !== '' && description !== '' && img !== '' && !isNaN(price) && !isNaN(stock) 
  };


const validUpdate = (body: FORM_DATA) => {
   const {title, description, img, stock, price} = body;
   return title !== '' || description !== '' || img !== '' || (!isNaN(stock) && stock >= 0) || (isNaN(price) && price >= 0 );
}

interface FORM_DATA {
    title: string,
    description: string,
    img: string,
    stock: number,
    price: number
}


const generateCode = () : string => {
    return `_${Math.random().toString(36).substr(2,9)}`; // Maybe replace substr with slice SHOULD SEE
}
const generateID = () : string => {
      return ''; // // Need to update code and make it with uuid()
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

const productsExist = (file: string) => {
    const data : string | [] | PRODUCT[] = JSON.parse(file)
    if(data === '' || data.length === 0 ){
        return false
    }else{
        return true
    }
}


export { validSave, validUpdate,  generateCode, generateID, PRODUCT, findProduct, productsExist }