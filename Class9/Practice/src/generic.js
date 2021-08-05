/*

- Crear un servidor que permita manejar una lista de mascotas y personas. Debe
poseer dos rutas principales: '/mascotas' y '/personas' dentro de las cuales se
encuentren las subrutas '/listar' y '/guardar'.
'.../listar' devolverá la lista requerida en formato objeto.
'.../guardar' permitirá guardar una persona ó mascota en arrays propios en
memoria, con el siguiente formato:
Persona -> { "nombre": ..., "apellido": ..., "edad":... }
Mascota -> { "nombre":..., "raza":..., "edad":... }

*/
import express from 'express';
const app = express();
const router = express.Router();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`This server is hosted at PORT: ${server.address().port}`);
})
server.on('error', error => {
    console.log(`ERROR: ${error}`)
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const validation = (obj, type) => {
    switch(type){
    case 'personas' : if(obj.name === undefined){
       return `The person doesn't have a name property...`
    }else if (obj.surname === undefined){
       return `The person doesn't have a surname property...`
    }else if (obj.age === undefined){
       return `The person doesn't have an age property`
    }else{
        personas.push(obj);
        return personas[personas.length - 1]
    }
    case 'mascotas' : if(obj.name === undefined){
        return `The pet doesn't have a name property...`
    }else if (obj.breed === undefined){
        return `The pet doesn't have a breed property...`
    }else if(obj.age === undefined){
        return `The pet doesn't have an age property...`
    }else{
        mascotas.push(obj);
        return mascotas[mascotas.length - 1]
    }
}
}

let mascotas = [];
let personas = [];
router.get('/mascotas',(req,res) => {
    res.json(`Please, go to the following addresses:
    '/mascotas/list', '/mascotas/save'`);
});
router.get('/personas', (req,res) => {
    res.json(`Pleas, go to the following addresses:
    '/personas/list', '/personas/save'`);
});
router.post('/mascotas/save', (req,res) => {
    let response = JSON.stringify(validation(req.body,'mascotas'),null,'')
    res.json(`The pet saved was ${response}`)

});
router.post('/personas/save', (req,res) => {
    let response = JSON.stringify(validation(req.body,'personas'),null,'')
    res.json(`The person saved was ${response}`)
    
});
router.get('/mascotas/list', (req,res) => {
    let objects = Object.assign({},mascotas);
    res.json(objects);
});
router.get('/personas/list', (req,res) => {
    let objects = Object.assign({},personas);
    res.json(objects);
});

app.use('/',router);