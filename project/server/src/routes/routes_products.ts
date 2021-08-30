import express, { Router } from "express";
//import controllerProduct from "../controllers/products";


const router_products: Router = express.Router();
const {
   getProducts ,
   getProduct,
   addProduct,
   updateProduct,
   deleteProduct
} = controllerProduct;

/* ------------------------ ROUTES ---------------------------- */ 

router_products.get("/list", getProducts)

router_products.get("/list/:id", getProduct);

router_products.put("/update/:id", updateProduct);

router_products.post("/save", addProduct);

router_products.delete("/delete/:id", deleteProduct);



/* --------------------------- EXPORT ------------------------------- */

export default router_products