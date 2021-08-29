import { Request, Response } from "express";
import { valid, generateID, PRODUCT, findProduct } from './utils/index'


class Products {
  products: PRODUCT[]
  constructor() {
    this.products = [];
    this.getProducts = this.getProducts.bind(this)
    this.addUpdateProducts = this.addUpdateProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

  }
  getProducts(req: Request, res: Response){
    const  id  : string = req.params.id
    if(this.products.length === 0){
      res.send('No products added.')
    }else{
      if(id == null){
        res.send(JSON.stringify(this.products));
      }else{
        console.log(id);
        const lookedFor : number = findProduct(this.products,id);
        lookedFor !== -1 ? res.send(JSON.stringify(this.products[lookedFor])) : res.send(`Product doesn't exist or wrong id typed...`)
      }
    }
  };
  
  addUpdateProducts(req: Request, res: Response){
    if (valid(req.body)) {
      const { title, price, thumbnail } = req.body;
      if (req.params.id) {
        const id : string = req.params.id;
        const lookedFor : number = findProduct(this.products,id);
        if ( lookedFor !== -1 ) {
          if (title) this.products[lookedFor].title = title;
          if (price) this.products[lookedFor].price = price;
          if (thumbnail) this.products[lookedFor].thumbnail = thumbnail;
          res.send(`Product successfully updated! ${JSON.stringify(this.products[lookedFor])}`);
        } else {
          res.send("Product not found. Please try another id...");
        }
      } else {
        this.products.push({
          title: title,
          price: Number(price),
          thumbnail: thumbnail,
          id: generateID()
        });
        res.send("Product successfully saved!");
      }
    } else {
      res.send("Please, insert the product properties correctly...");
    }
  };
 deleteProduct (req: Request,res: Response){
      const id : string = req.params.id
      const lookedFor : number = findProduct(this.products,id);
      if(lookedFor !== -1){
        const deleted = this.products.splice(lookedFor,1);
        res.send(`Product successfully deleted! ${JSON.stringify(deleted)}`)
      }else{
        res.send("Product not found. Please try another id...")
      }
  }
}
let controller = new Products();

export { controller };
