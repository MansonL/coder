import express from "express";
import Product from "../class";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import * as validations from "../lib/validations";
import App from "../../../client/src/App";
import path from "path";
import { publicPath } from "../server";

const router = express.Router();


/* ------------------------ ROUTES GET ---------------------------- */ 

//router.get("/list", (req,res) => {
//});

/* router.get('/save', (req,res) => {

});

router.get('/', (req,res) => {

});

/* ------------------------ ROUTES GET ---------------------------- */

router.put("/update/:id", (req,res) => {

});

router.delete("/delete/:id", (req,res) => {

});

router.post("/save", (req,res) => {
   
});

/* --------------------------- EXPORT ------------------------------- */

export {router}; 