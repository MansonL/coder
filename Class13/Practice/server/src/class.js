const valid = (body) => {
  const [title,price, thumbnail] = body;
  return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != ''
};

class Products {
  constructor() {
    this.products = [];
    this.getProducts = this.getProducts.bind(this)
    this.addUpdateProducts = this.addUpdateProducts.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)

  }
  getProducts(req, res){
    const { id } = req.params;
    this.products.length === 0
      ? res.send("No products added.")
      : id == null
      ? res.send(this.products)
      : res.send(this.products[id]);
  };
  addUpdateProducts(req, res){
    if (valid(req.body)) {
      const { title, price, thumbnail } = req.body;
      if (req.params.id) {
        const id = req.params.id;
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
          id: this.products.length++,
        });
        res.send("Product succesfully saved!");
      }
    } else {
      res.send("Please, insert the product properties correctly...");
    }
  };
 deleteProduct (req,res){
      const id = --req.params.id;
      if(this.products[id]){
        const deleted = this.products.splice(id,1);
        this.products.forEach(product => {
           if(product.id > ++id) product.id -= 1;
        });
        res.send(`Product successfully deleted! ${deleted}`)
      }else{
        res.send("Product not found. Please try another id...")
      }
  }
}
let controller = new Products();

export { controller };
