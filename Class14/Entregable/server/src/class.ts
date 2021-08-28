import { Request, Response } from "express";

const valid = (body : [string, string, string]) => {
  const [title,price, thumbnail] = body;
  return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != ''
};

class Products {
  products: {title: string, price:number, thumbnail:string, id: number}[]
  constructor() {
    this.products = [];
    this.getProducts = this.getProducts.bind(this)
    this.addUpdateProducts = this.addUpdateProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

  }
  getProducts(req: Request, res: Response){
    const { id } = req.params
    this.products.length === 0
      ? res.send("No products added.")
      : id == null
      ? res.send(this.products)
      : res.send(this.products[Number(id)]);
  };
  addUpdateProducts(req: Request, res: Response){
    if (valid(req.body)) {
      const [ title, price, thumbnail ] = req.body;
      if (req.params.id) {
        const id : number = Number(req.params.id);
        if (this.products[id]) {
          if (title) this.products[id].title = title;
          if (price) this.products[id].price = price;
          if (thumbnail) this.products[id].thumbnail = thumbnail;
          res.send(`Product successfully updated! ${this.products[id]}`);
        } else {
          res.send("Product not found. Please try another id...");
        }
      } else {
        this.products.push({
          title: title,
          price: price,
          thumbnail: thumbnail,
          id: this.products.length + 1,
        });
        res.send("Product successfully saved!");
      }
    } else {
      res.send("Please, insert the product properties correctly...");
    }
  };
 deleteProduct (req: Request,res: Response){
      const id : number = Number(req.params.id);
      if(this.products[id]){
        const deleted = this.products.splice(id - 1,1);
        this.products.forEach(product => {
           if(product.id > (id + 1)) product.id -= 1;
        });
        res.send(`Product successfully deleted! ${deleted}`)
      }else{
        res.send("Product not found. Please try another id...")
      }
  }
}
let controller = new Products();

export { controller };
