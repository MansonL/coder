import { connect } from "mongoose";
import Student from "./models";

const uri = "mongodb+srv://mansonl_00:lautaro123@20practice.q4rlk.mongodb.net/20Practice?retryWrites=true&w=majority";
const CRUD = async () => {
    console.log(`Connecting to the DB`);
    await connect(uri);
    await Student.deleteMany({});
    await Student.insertMany([
        { name: 'Pedro', surname: 'Mei', age: 21, DNI: '31155898', course: '1A', grade: 7 },
        { name: 'Ana', surname: 'Gonzalez', age: 32, DNI: '27651878', course: '1A', grade: 8 },
        { name: 'José', surname: 'Picos', age: 29, DNI: '34554398', course: '2A', grade: 6 },
        { name: 'Lucas', surname: 'Blanco', age: 22, DNI: '30355874', course: '3A', grade: 10 },
        { name: 'María', surname: 'García', age: 36, DNI: '29575148', course: '1A', grade: 9 },
        { name: 'Federico', surname: 'Perez', age: 41, DNI: '320118321', course: '2A', grade: 5 },
        { name: 'Tomas', surname: 'Sierra', age: 19, DNI: '38654790', course: '2B', grade: 4 },
        { name: 'Carlos', surname: 'Fernández', age: 33, DNI: '26935670', course: '3B', grade: 2 },
        { name: 'Fabio', surname: 'Pieres', age: 39, DNI: '4315388', course: '1B', grade: 9 },
        { name: 'Daniel', surname: 'Gallo', age: 25, DNI: '37923460', course: '3B', grade: 2 }
        ]);
    
    }

CRUD();