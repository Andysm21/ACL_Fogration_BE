const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const admin = require('../Schemas/Administrator.js');
const instructor = require('../Schemas/Instructor.js');
const corporateUser = require('../Schemas/CorporateUser.js');
const course = require('../Schemas/Course.js');

function createAdmin(p1) {
    admin.create(p1.body)
}
function createInstructor(p1) {
    instructor.create(p1.body)
    
}
function createCorporateUser(p1) {
    corporateUser.create(p1.body)
}
function signUP(p1) {
    user.create(p1.body)
}

function createCourse(p1) {
    course.create(p1.body)
}

module.exports={signUP,createAdmin,createCorporateUser,createInstructor,createCourse}