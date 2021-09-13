import {Schema, model} from 'mongoose';
interface IStudent {
    name: string;
    surname: string;
    age: number;
    DNI: string;
    course: string;
    grade: number;
}
const studentsC = 'students';
const studentsSchema = new Schema<IStudent>({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: Number, required: true, max:80, min:5},
    DNI: {type: String, required: true},
    course: {type: String, required: true},
    grade: {type: Number, required: true, max:10, min:1}
});

const Student = model<IStudent>(studentsC,studentsSchema);


export default Student