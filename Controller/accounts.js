const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const admin = require('../Schemas/Administrator.js');
const instructor = require('../Schemas/Instructor.js');
const corporateUser = require('../Schemas/CorporateUser.js');
const course = require('../Schemas/Course.js');

function createAdmin(p1,id) {
    admin.create({Admin_ID:id,Admin_Username:p1.body.Admin_Username,Admin_Password:p1.body.Admin_Password})
}
function createInstructor(p1,id) {
    var agree=Number(0)
    instructor.create({Instructor_ID:id,Instructor_Password:p1.body.Instructor_Password,Instructor_Ratings:p1.body.Instructor_Ratings,
    Instructor_username:p1.body.Instructor_username,Instructor_Reviews:p1.body.Instructor_Reviews,Instructor_Biography:p1.body.Instructor_Biography,Instructor_Country:p1.body.Instructor_Country,
    Instructor_Courses:p1.body.Instructor_Courses,Instructor_Email:p1.body.Instructor_Email,Instructor_FirstName:p1.body.Instructor_FirstName,Instructor_Gender:p1.body.Instructor_Gender,
    Instructor_LastName:p1.body.Instructor_LastName,Instructor_Agreement:agree, Instructor_Current_Balance:0,Instructor_Balance_Date:new Date()})
    
}
function createCorporateUser(p1,id) {
    corporateUser.create({CorporateUser_ID:id,CorporateUser_Password:p1.body.CorporateUser_Password,CorporateUser_UserName:p1.body.CorporateUser_UserName
    ,CorporateUser_Email:p1.body.CorporateUser_Email,CorporateUser_FirstName:p1.body.CorporateUser_FirstName,CorporateUser_LastName:p1.body.CorporateUser_LastName,CorporateUser_Gender:p1.body.CorporateUser_Gender,CorporateUser_Country:p1.body.CorporateUser_Country,CorporateUser_Corporate:p1.body.CorporateUser_Corporate})
}
function signUP(p1,id) {
    user.create({IndividualUser_ID:id,individualUser_UserName:p1.body.individualUser_UserName,individualUser_Password:p1.body.individualUser_Password,individualUser_Email:p1.body.individualUser_Email,individualUser_FirstName:p1.body.individualUser_FirstName,individualUser_LastName:p1.body.individualUser_LastName,individualUser_Gender:p1.body.individualUser_Gender,IndividualUser_Country:p1.body.individualUser_Country,individualUser_Wallet:0})
}



module.exports={signUP,createAdmin,createCorporateUser,createInstructor}
