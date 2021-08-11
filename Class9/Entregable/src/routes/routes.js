import express from "express";
import Postman from "../class";

const router = express.Router();

const test = new Postman();

/* ----------------- TESTING OBJECTS ----------------------- */

test.addUpdateProduct(
  "Roast Beef",
  8.99,
  "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg",
  "save"
);
test.addUpdateProduct(
  "Milk",
  1.29,
  "https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg",
  "save"
);
test.addUpdateProduct(
  "Beans",
  0.99,
  "https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75",
  "save"
);

/* --------------  VALIDATING EMPTY PROPERTIES  ----------------- */

const saveUpdateVal = async (title, price, thumbnail, type, id = null) => {
  if (title !== "" && price !== "" && thumbnail !== "") {
    return await test.addUpdateProduct(title, price, thumbnail, type, id);
  } else {
    return new Error(`Please set the product properties correctly...`);
  }
};

/* ---------------------  ROUTES GET  ------------------------ */

router.get("/", (req, res) => {
  res.json(`You can access the followings addresses:
    '/api/products/list',
    '/api/products/list/id',  
    '/api/products/save/' (to save a product)'`); //IN CASE OF MISPELLING ADDRESSES
});
router.get("/products", (req, res) => {
  res.json(`Go to one of the followings addresses:
       '/api/products/list',
       '/api/products/list/id',
       '/api/products/save/' (to save a product)',
       '/api/products/update/id',
       '/api/products/delete/id'`);  //IN CASE OF MISPELLING ADDRESSES
});
router.get("/products/list", async (req, res) => {
  const products = await test.getProducts();
  res.json(products);   
});
router.get("/products/list/:id", async (req, res) => {
  const id = req.params.id;
  const products = await test.getOne(id);
  res.json(products);
});

/* --------------  ROUTES POST, PUT & DELETE  ------------------- */

router.post("/products/save", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const result = await saveUpdateVal(title, price, thumbnail, "save");
  typeof result === "string" // STRING WILL BE ERROR, OBJECT
     ? res.json(             // WILL BE A SUCCESSFUL OPERATION
        `Couldn't save the product, please insert the product properties correctly...`
      )
    : res.json(`Product saved: ${JSON.stringify(result)}`);
});
router.put("/products/update/:id", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const id = req.params.id;
  const result = await saveUpdateVal(title, price, thumbnail, "update", id);
  typeof result === "string"    // STRING WILL BE ERROR, OBJECT
    ? res.json(                 // WILL BE A SUCCESSFUL OPERATION
        `Couldn't modify the product, check the id of the product you're interested in...`
      )
    : res.json(`Product updated: ${JSON.stringify(result)}`);
});
router.delete("/products/delete/:id", async (req, res) => {
  const id = req.params.id;
  const deleted = await test.delete(id);
  typeof deleted === "string" // STRING WILL BE ERROR, OBJECT
    ? res.json(               // WILL BE A SUCCESSFUL OPERATION
        `Couldn't delete the product, check the id of the product you're interested in...`
      )
    : res.json(`Product deleted: ${JSON.stringify(deleted)}`);
});

/* --------------  EXPORT DEFAULT  ------------------- */

export default router;
