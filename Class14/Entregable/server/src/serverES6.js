import express from "express";
import http from "http";
import { router_products } from "./routes/routes_products";
import cors from 'cors';

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app = express();
const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/products", router_products);

