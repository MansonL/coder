import express from "express";
import Postman from "../class";

const router = express.Router();

const test = new Postman();

test.addUpdateProduct('Roast Beef', 8.99,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg','save');
test.addUpdateProduct('Milk',1.29, 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg','save' );
test.addUpdateProduct('Beans', 0.99, 'https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75','save');


const saveUpdateVal = async (title, price, thumbnail, id = null, type) => {
  if (title !== "" && price !== "" && thumbnail !== "") {
    return await test.addUpdateProduct(title, price, thumbnail,'save', id);
  } else {
    return new Error(`Please set the product properties correctly...`);
  }
};

router.get("/", (req, res) => {
    res.render('home');
});
router.get("/products", (req, res) => {
  res.render('home');
});
router.get("/products/list", async (req, res) => {
  let result = await test.getProducts();
  result.length > 0
    ? res.render("table", {
        errorExists: false,
        productsExist: true,
        items: true,
        products: result,
      })
    : res.render("table", {
        errorExists: true,
        productsExist: false,
        message: result.error,
      });
});
router.get("/products/list/:id", async (req, res) => {
  let id = req.params.id;
  let result = await test.getOne(id);
  !result.error
    ? res.render("table", {
        errorExists: false,
        productsExist: true,
        products: result,
      })
    : res.render("table", {
        errorExists: true,
        productsExist: false,
        message: result.error,
      });
});
router.post("/products/save", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const result = await saveUpdateVal(title, price, thumbnail);
  const err = /Error:/gi;
  console.log(result);
  err.test(result)
    ? res.render("form", {
        message: `${result}`,
        errorExists: true,
        messageExists: false,
      })
    : res.render("form", {
        message: `${result}`,
        errorExists: false,
        messageExists: true,
      });
});
router.get("/products/save", async (req, res) => {
  res.render("form", { errorExists: false, messageExists: false });
});
router.put("/products/update/:id", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const id = req.params.id;
  const result = await saveUpdateVal(title, price, thumbnail, id);
  console.log(result)
  res.json(result);
});
router.delete("/products/delete/:id", async (req, res) => {
  let id = req.params.id;
  let deleted = await test.delete(id);
  deleted === undefined
    ? res.json(
        `Couldn't delete the product, check the id of the product you're interested in...`
      )
    : res.json(`Product deleted: ${JSON.stringify(deleted)}`);
});
export default router;
