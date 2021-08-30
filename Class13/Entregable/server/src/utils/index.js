const valid = (body) => {
    const [title,price, thumbnail] = body;
    return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != ''
  };

const generateID = () => {
    return `_${Math.random().toString(36).substr(2,9)}`;
}

const findProduct = (products , id) => {
    return products.findIndex(product => product.id === id)
}

export { valid, generateID, findProduct }