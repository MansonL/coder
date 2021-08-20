import express from "express";
import path from "path";
import productClass from './class'
import handlebars from "express-handlebars";

/*-------------  INITIALIZING SERVER & APP  -----------------*/
const PORT = 8080;
const APP = express();
const publicPath = path.resolve(__dirname, "./public");

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

/*-------------  SERVER LISTENING PORT & ERRORS  -----------*/
const http = require("http").Server(APP);

http.listen(PORT, () => {
  console.log(`Hi! This server is hosted at PORT: ${http.address().port}`);
});
http.on("error", (error) => {
  console.log(`Error: ${error}`);
});

APP.use(express.static(publicPath));

/*--------------- HBS TEMPLATE ENGINE CONFIGURATION  --------*/

APP.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

APP.set("views", "./src/views");
APP.set("view engine", "hbs");


/* ----------------- TESTING OBJECTS ----------------------- */
const test = new productClass();


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




/* ------------------ SOCKET IMPLEMENTATION ----------------------- */

const io = require("socket.io")(http);

APP.get("/socket/form", (req, res) => {
  res.render("form", { errorExists: false, messageExists: false });
});

APP.post('/socket/form', async (req,res) => {
  const { title, price, thumbnail } = req.body;
  const result = await saveUpdateVal(title, price, thumbnail);
  const err = /Error:/gi;
  err.test(result)     // IF RESULTS WITH AN ERROR, IT WILL RENDER 
    ? res.render("form", { // AN ERROR ALERT OR A SUCCESSFUL ALERT
        message: `${result}`,
        errorExists: true,
        messageExists: false,
      })
    : res.render("form", {
        message: `${result}`,
        errorExists: false,
        messageExists: true,
      });
})

io.on("connection", async (socket) => {
  console.log("New client connected!");
  let result = await test.getProducts();
  if (result.length > 0) {
    io.sockets.emit("show", result);
  } else {
    io.sockets.emit("show", result.error);
  }

});
