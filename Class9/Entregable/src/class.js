export default class Postman {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    return this.products.length === 0
      ? "No products saved."
      : this.products;
  }

  async getOne(id) {
    return typeof this.products[id] === "object"
      ? this.products[id]
      : `Couldn't find any product. Try another id starting on 0...`;
  }

  async addUpdateProduct(
    title = null,
    price = null,
    thumbnail = null,
    type,
    id = null
  ) {
    let t = typeof title === "string";
    let p = !isNaN(price);
    let thumb = typeof thumbnail === "string";
    try {
      switch (type) {
        case "save":
          if (!t) throw new Error("Title must be a string");
          if (!t) throw new Error("Price must be a number");
          if (!thumb) throw new Error("Thumbnail must be an URL string");       // VALIDATING OBJECT PROPERTIES TO MODIFY
          id = this.products.length;
          this.products.push({
            title: title,
            price: price,        // SAVING THE NEW PRODUCT
            thumbnail: thumbnail,
            id: id,
          });     
          return this.products[this.products.length - 1];

        case "update":
          if (typeof eval(id) !== "number") throw new Error(`No id indicated.`);
          if (typeof this.products[id] !== "object")
            throw new Error(
              `Couldn't find any product, try another id starting on 0...`
            );           // VALIDATING OBJECT PROPERTIES TO MODIFY
          if (t) this.products[id].title = title;
          if (p) this.products[id].price = price;
          if (thumb) this.products[id].thumbnail = thumbnail;
          return this.products[id];
      }
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
  async delete(id) {
    try {
      if (typeof this.products[id] !== "object")
        throw new Error(
          `Couldn't find any product, try another id starting on 0...`    // VALIDATION IN CASE INVALID ID
        );
      const deleted = this.products[id];
      this.products = this.products.map((obj) => {
        if (obj.id > deleted.id) {
          obj.id--;
        }                       // ORDERING THE FOLLOWINGS ID'S DUE
        return obj;             // THE CHANGE
      });
      this.products.splice(id, 1);
      return deleted;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
}
