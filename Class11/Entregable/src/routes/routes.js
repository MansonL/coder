import express from "express";
import Postman from "../class.js";

const router = express.Router();

const test = new Postman();

/* ----------------- TESTING OBJECTS ----------------------- */

test.addUpdateProduct(
  "Roast Beef",
  8.99,
  "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg"
);
test.addUpdateProduct(
  "Milk",
  1.29,
  "https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg"
);
test.addUpdateProduct(
  "Beans",
  0.99,
  "https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75"
);
/* --------------  VALIDATING EMPTY PROPERTIES  ----------------- */

const saveUpdateVal = async (title, price, thumbnail, id = null) => {
  if (title !== "" && price !== "" && thumbnail !== "") {
    return await test.addUpdateProduct(title, price, thumbnail, id);
  } else {
    return new Error(`Please set the product properties correctly...`);
  }
};

/* ---------------------  ROUTES GET  ------------------------ */

router.get("/", (req, res) => {
  res.render("layouts/index",{view:'home'});      // KIND OF GUIDE TO THE API
});
router.get("/products", (req, res) => {
  res.render("layouts/index",{view:'home'});
});
router.get("/products/list", async (req, res) => {
  let result = await test.getProducts();
  console.log(result)
  result.length > 0
    ? res.render("layouts/index", { // WILL RENDER DIFFERENT TEMPLATES 
        productsExist: true, // IF THERE'S ANY PRODUCT OR NOT
        errorExists: false,
        items: true,
        products: result,
        view:'table'
      })
    : res.render("layouts/index", {
      productsExist: false,  
      errorExists: true,
        message: result.error,
        view:'table'
      });
});
router.get("/products/list/:id", async (req, res) => {
  let id = req.params.id;
  let result = await test.getOne(id);
  !result.error
    ? res.render("layouts/index", {   // WILL RENDER DIFFERENTS TEMPLATES
        errorExists: false,   // IF THE PRODUCT EXISTS OR NOT
        productsExist: true,
        products: result,
        view:'table'
      })
    : res.render("layouts/index", {
        errorExists: true,
        productsExist: false,
        message: result.error,
        view:'table'
      });
});
router.get("/products/save", async (req, res) => {
  res.render("layouts/index", { errorExists: false, messageExists: false, view:'form' });
});

/* --------------  ROUTES POST, PUT & DELETE  ------------------- */

router.post("/products/save", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const result = await saveUpdateVal(title, price, thumbnail);
  const err = /Error:/gi;
  err.test(result)     // IF RESULTS WITH AN ERROR, IT WILL RENDER 
    ? res.render("layouts/index", { // AN ERROR ALERT OR A SUCCESSFUL ALERT
        message: `${result}`,
        errorExists: true,
        messageExists: false,
        view:'form'
      })
    : res.render("layouts/index", {
        message: `${result}`,
        errorExists: false,
        messageExists: true,
        view:'form'
      });
});
router.put("/products/update/:id", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const id = req.params.id;
  const result = await saveUpdateVal(title, price, thumbnail, id);
  typeof result === "string"
    ? res.json(    // STRING WILL BE ERROR, OBJECT
                   // WILL BE A SUCCESSFUL OPERATION
        `Couldn't modify the product, check the id of the product you're interested in...`
      )
    : res.json(`Product updated: ${JSON.stringify(result)}`);
});
router.delete("/products/delete/:id", async (req, res) => {
  let id = req.params.id;
  let deleted = await test.delete(id);
  typeof deleted === "string"
    ? res.json(     // STRING WILL BE ERROR, OBJECT
                    // WILL BE A SUCCESSFUL OPERATION
        `Couldn't delete the product, check the id of the product you're interested in...`
      )
    : res.json(`Product deleted: ${JSON.stringify(deleted)}`);
});

/* --------------  EXPORT DEFAULT  ------------------- */

export default router;
