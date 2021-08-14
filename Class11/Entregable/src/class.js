export default class Postman {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    return this.products.length === 0
      ? { error: `No products saved.` }
      : this.products;
  }

  async getOne(id) {
    return typeof this.products[id] === "object"
      ? this.products[id]
      : { error: `Couldn't find any product. Try another id starting on 0...` };
  }

  async addUpdateProduct(
    title = null,
    price = null,
    thumbnail = null,
    id = null
  ) {
    let t = typeof title === "string";
    let p = !isNaN(price);
    let thumb = typeof thumbnail === "string";
    let typeid = typeof id;
    console.log(typeid)
    try {
      switch (typeid) {
        case "object":
          if (!t) throw new Error("Title must be a string");
          if (!t) throw new Error("Price must be a number");
          if (!thumb) throw new Error("Thumbnail must be an URL string");
          id = this.products.length;
          this.products.push({
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: id,
          });
          return "Product saved succesfully!";

        case "string":
          if (typeof eval(id) !== "number") throw new Error(`No id indicated.`);
          if (typeof this.products[id] !== "object")
            throw new Error(
              `Couldn't find any product, try another id starting on 0...`
            );
          if (t) this.products[id].title = title;
          if (p) this.products[id].price = price;
          if (thumb) this.products[id].thumbnail = thumbnail;
          return this.products[id];
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async delete(id) {
    try {
      if (typeof this.products[id] !== "object")
        throw new Error(
          `Couldn't find any product, try another id starting on 0...`
        );
      let deleted = this.products[id];
      this.products = this.products.map((elem) => {
        if (elem.id > deleted.id) {
          elem.id--;
        }
        return elem;
      });
      this.products.splice(id, 1);
      return deleted;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
