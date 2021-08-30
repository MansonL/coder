const valid = (body : [title:string, price:string, thumbnail:string]) => {
    const [title,price, thumbnail] = body;
    return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != ''
  };

const generateID = () => {
    return `_${Math.random().toString(36).substr(2,9)}`;
}

type PRODUCT = {
    title: string,
    price: number,
    thumbnail: string,
    id: string
}

const findProduct = (products : PRODUCT[], id : string) => {
    return products.findIndex((product: PRODUCT) : boolean => product.id === id)
}

export { valid, generateID, PRODUCT, findProduct }