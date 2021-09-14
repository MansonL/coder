import { connect } from 'mongoose';
import Student from './models/student';
import students from './utils/studentsArr';

const uri = 'mongodb+srv://mansonl_00:lautaro123@20practice.q4rlk.mongodb.net/20Practice?retryWrites=true&w=majority';

const CRUD = async () => {
    console.log(`Connecting to the DB`);

    /* ---------- CONNECTION -------------------- */

    await connect(uri);

    /* ---------- INSERTING STUDENTS DOCUMENT ----------*/

    await Student.deleteMany({});
    await Student.insertMany(students);

    /* -------------- DIFFERENTS READING ---------------*/

    const alph = await Student.find({}).sort({ name: 1 });
    console.log(alph);
};

CRUD();
