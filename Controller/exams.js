const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const question = require('../Schemas/Question.js');
const exam = require('../Schemas/Exam.js');
const { response } = require("express");

function createQuestion(ID,Name,Choices,Correct_Answer,Grade){
    question.create({Question_ID:ID,Question_Name:Name,Question_Choices:Choices,
        Question_Correct_Answers:Correct_Answer,Question_Grade:Grade})
}
function createExam(p1,questions,grade,id){
    exam.create({Exam_ID:id,Exam_Question_ID:questions,Exam_Grade: grade,
        Exam_Instructor_ID: p1.body.Instructor, Exam_Course_ID: p1.body.Course})
}



module.exports={createQuestion,createExam};