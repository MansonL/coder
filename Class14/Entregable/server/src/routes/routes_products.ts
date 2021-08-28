import express, { Router } from "express";
import {controller} from "../class";


const router_products: Router = express.Router();


/* ------------------------ ROUTES GET ---------------------------- */ 

router_products.get("/list", controller.getProducts)

router_products.get("/list/:id", controller.getProducts);

router_products.put("/update/:id", controller.addUpdateProducts);

router_products.post("/save", controller.addUpdateProducts);

router_products.delete("/delete/:id", controller.deleteProduct);



/* --------------------------- EXPORT ------------------------------- */

export {router_products}; 