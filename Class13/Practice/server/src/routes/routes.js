import express from "express";
import {controller} from "../class";


const router = express.Router();


/* ------------------------ ROUTES GET ---------------------------- */ 

router.get("/list", controller.getProducts);

router.get("/list/:id", controller.getProducts);

router.put("/update/:id", controller.addUpdateProducts);

router.post("/save", controller.addUpdateProducts);

router.delete("/delete/:id", controller.deleteProduct);



/* --------------------------- EXPORT ------------------------------- */

export {router}; 