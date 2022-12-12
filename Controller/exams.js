const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const question = require('../Schemas/Question.js');
const exam = require('../Schemas/Exam.js');
const { response } = require("express");

async function createQuestion(ID,Name,Choices,Correct_Answer,Grade){
    await question.create({Question_ID:ID,Question_Name:Name,Question_Choices:Choices,
        Question_Correct_Answers:Correct_Answer,Question_Grade:parseInt(Grade)})
}
async function createExam(p1,questions,grade,id){
    await exam.create({Exam_ID:id,Exam_Question_ID:questions,Exam_Grade: grade,
        Exam_Instructor_ID: parseInt(p1.body.Instructor), Exam_Course_ID: parseInt(p1.body.Course)})
}



module.exports={createQuestion,createExam};