/* ------------ GENERIC CHALLENGES 1-2 ---------------

import express from 'express';
import path from 'path';
/* -------- GENERIC2 CHALLENGE ----------

import fs from 'fs';

/* --------------------------------------------------- 

const PORT = 8080;
const APP = express();


/* ---------------- GENERIC1 CHALLENGE -------------------  
--------
--------
const publicPath = path.resolve(__dirname,'./public/');
APP.use(express.static(publicPath));


-------------------- GENERIC2 CHALLENGE ------------------
-------
------- *

const eHTMLPath = path.resolve(__dirname,'./cte1');
const eOBJPath = path.resolve(__dirname,'./cte2');

const SERVER = APP.listen(PORT, () => {
    console.log(`Server hosted at PORT: ${SERVER.address().port}`);
});
SERVER.on('error', error => {
    console.error(`Error: ${error}`);
});

/* ---------------  CREATING CUSTOM TEMPLATE ENGINE -------- 

APP.engine('cte', (eHTMLFilePath,options,callback) => {
   
    fs.readFile(eHTMLFilePath,(error,content) => {
       if(error) return callback(new Error(error));
       //let rendered = content.toString().replace('#title#', ` ${options.title} `).replace('#message#', ` ${options.message} `).replace('#author#', ` ${options.author} `).replace('#version#', ` ${options.version} `); ./cte1
       let rendered = content.toString().replace('#nombre#',options.nombre).replace('#apellido#',options.apellido).replace('#date#',options.date); // ./cte2
       return callback(null,rendered)
    })
      
});

/* ------ REGISTERING THE TEMPLATE ENGINE ------------

//APP.set('views', eHTMLPath); HTML rendering
APP.set('views',eOBJPath); // OBJ rendering
APP.set('view engine','cte');
APP.get('/',(req,res) => {
    //res.render('plantilla1', {title:'CTE Template',message:'I did it motherfucker.',author:'Lautaro Manson',version:'1.0.0'}) HTML rendering
    let date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDay() + 1;
    const month = date.getMonth() + 1 ;
    const year = date.getFullYear();
    date = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    res.render('plantilla2',{nombre: 'Lautaro', apellido:'Manson',date:date});

})

/* ----------------  GENERIC CHALLENGE 3  -------------------*/
