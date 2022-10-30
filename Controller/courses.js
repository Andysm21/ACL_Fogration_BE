const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const course = require('../Schemas/Course.js');


function createCourse(p1) {
// const {Course_ID}=p1.body
// if({Course_ID}==course.find({Course_ID:Course_ID})){
//     p2.status(200).send("Course ID already in the system ");
// }
// else{
    course.create(p1.body)
// }
}




module.exports={createCourse,getCourse}