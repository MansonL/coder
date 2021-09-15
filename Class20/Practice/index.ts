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
    // Descending name order.
    console.log(await Student.find({}).sort({ name: 1 }));
    // The youngest student.
    console.log(await Student.find({}).sort({ age: 1 }).limit(1));
    // The 2A course students.
    console.log(await Student.find({ course: '2A' }));
    // The second youngest student.
    console.log(await Student.find({}).sort({ age: 1 }).skip(1).limit(1));
    //  Just student's name, surname, and course in a descending order by their surnames.
    console.log(await Student.find({}, { name: 1, surname: 1, course: 1 }).sort({ surname: 1 }));
    // The students that have gotten a 10 grade.
    console.log(await Student.find({ grade: 10 }));
    // The student's grade average.
    const gradesDoc = await Student.find({}, { grade: 1, _id: 0 });
    const numberOfStudents = gradesDoc.length;
    const gradesArr = gradesDoc.map((grades: { grade: number }): number => grades.grade);
    const gradesTotal = gradesArr.reduce((acc: number, grade: number): number => acc + grade);
    console.log(`${gradesTotal / numberOfStudents}`);
    // The '1A' course student's average.
    const gradesDoc_1A = await Student.find({ course: '1A' }, { grade: 1, _id: 0 });
    const numberOfStudents_1A = gradesDoc_1A.length;
    const gradesArr_1A: number[] = gradesDoc_1A.map((grades: { grade: number }): number => grades.grade);
    const gradesTotal_1A: number = gradesArr_1A.reduce((acc: number, grade: number): number => acc + grade);
    console.log(`${gradesTotal_1A / numberOfStudents_1A}`);
};

CRUD();
