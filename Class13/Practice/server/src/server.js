import express from "express";
import http from "http";
import path from "path";
import socket from "socket.io";
import {router} from "./routes/routes";

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app = express();
const server = http.Server(app);
const io = socket(server);
const PORT = 8080;
const publicPath = path.resolve("../../client/public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

console.log(__dirname);

server.listen(PORT, () => console.log(server.address().port));
io.on("connection", socket => {
    
});

/* ------------------------------ ROUTER -------------------------------- */

app.use("/products", router);

export {publicPath};