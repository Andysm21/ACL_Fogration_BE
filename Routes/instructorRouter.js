var bodyParser = require('body-parser');
const mongoDb = require('mongoose');
const express= require("express");
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');

router.get('/viewMyCoursesInstructor', async (req,res)=>{
    const {Course_Instructor}= req.body
    console.log(await course.find({Course_Instructor: Course_Instructor}).select('Course_Title'))
    res.status(200).send("Titles of Courses");
  });


  router.get("/SearchCourseTitle", async (req, res) => {
    const x = req.body.Instructor_ID
    const {SearchTitle}= req.body
    if({SearchTitle} == ''){
        console.log(course.find('Course_Title Course_Rating Course_Hours'));
        res.status(200).send("Searched by Titles");
    }
    else if(await (await course.find({Course_Instructor: x, Course_Title:SearchTitle},'Course_Title Course_Rating Course_Hours').length == 0))
    {  
        res.status(200).send("Titles Not Found");
        console.log("Titles Not Found");
    }   
    else{
        console.log(await course.find({Course_Instructor: x, Course_Title:SearchTitle},'Course_Title Course_Rating Course_Hours'))
        res.status(200).send("Searched by Titles");
        }
        
    
  });

  router.get("/SearchCourseSubject", async (req, res) => {
    const x = req.body.Instructor_ID
    const {SearchSubject}= req.body
    if({SearchSubject} == ''){
        console.log(course.find('Course_Title Course_Rating Course_Hours'));
        res.status(200).send("Searched by Subject");
    }
    else if(await (await course.find({Course_Instructor: x, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours').length == 0))
        {  
            res.status(200).send("Subject Not Found");
            console.log("Subject Not Found");
        } 
    else{
        console.log(await course.find({Course_Instructor: x, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours'))
        res.status(200).send("Searched by Subject");
    }
        
  });

  router.get("/filterPrice", async (req, res) => {
    const x = req.body.Instructor_ID
    const {FilterPrice}= req.body
    
    console.log(await course.find({Course_Price: FilterPrice},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Filtered by Price");
  });

  router.get("/filterSubject", async (req, res) => {
    const x = req.body.Instructor_ID
    const {FilterSubject} = req.body
    console.log(await course.find({Course_Instructor: x, Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Filtered by Subject");
  });

module.exports=router;