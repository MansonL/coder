"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var studentsC = 'students';
var studentsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true, max: 80, min: 5 },
    DNI: { type: String, required: true },
    course: { type: String, required: true },
    grade: { type: Number, required: true, max: 10, min: 1 }
});
var Student = (0, mongoose_1.model)(studentsC, studentsSchema);
exports["default"] = Student;
