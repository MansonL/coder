export class Postman {
    constructor(){
        this.products = [];
        this.getProducts = () =>
            this.products.length === 0 ? ({error: 'No products saved.'}) : this.products;
        this.getOne = async (id) => 
            typeof this.products[id] === 'object' ? this.products[id] : `Couldn't find any product. Try another id starting on 0...`
        
        this.addProduct = async (title,price,thumbnail) => {
            try {
                if (typeof title !== 'string') throw new Error('Title must be a string');
                if (typeof price !== 'number') throw new Error('Price must be a number');
                if (typeof thumbnail !== 'string') throw new Error ('Thumbnail must be an URL string')
                let id = this.products.length; 
                this.products.push({
                    title:title,
                    price:price,
                    thumbnail:thumbnail,
                    id:id
                })
            } catch (error) {
                console.error(error)
            }
        };
    }
}
