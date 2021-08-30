import express from "express";
import http from "http";
import router from "./routes/index";
import cors from 'cors'

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */


const app : express.Application = express();
const server : http.Server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/", router);
