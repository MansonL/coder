const inputVal = (inputs) => {
    const [title, price, thumbnail] = inputs;
    return title !== '' && price !== '' && thumbnail !== '' ?  'Product saved successfully!' : 'Please, insert the products properties correctly...'
}




export {inputVal}