var bodyParser = require('body-parser');
const mongoDb = require('mongoose');
const express= require("express");
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const Question = require('../Schemas/Question.js');
const Exam = require('../Schemas/Exam.js');
const exams = require('../Controller/exams.js')
const courseCC = require('../Controller/courses.js')

router.get('/viewMyCoursesInstructor', async (req,res)=>{
    const x = req.body.Instructor_FirstName
    var data ="Titles of Courses" + "\n"
     data += await course.find({Course_Instructor: x}).select('Course_Title -_id') + "\n"
    res.status(200).send(data);
  });


  router.get("/SearchCourseTitleInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const Course_Title= req.body.Course_Title
    if(Course_Title == ''){
        var data = "Searched by Titles: "+ "\n"
       data+=course.find('Course_Title Course_Rating Course_Hours -_id');
        res.status(200).send(data);
    }
    else if(await course.find({Course_Instructor: Instructor_FirstName, Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id').length == 0)
    {  
        res.status(200).send("Titles Not Found");
        console.log("Titles Not Found");
    }   
    else{
      var data = await course.find({Course_Instructor: Instructor_FirstName, Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id') + '\n'
      res.status(200).send("Searched by Titles" + "\n"+ data);
        }
        
    
  });

  router.get("/SearchCourseSubjectInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const SearchSubject= req.body.SearchSubject
    if(SearchSubject == ''){
      var data = course.find('Course_Title Course_Rating Course_Hours -_id')
      res.status(200).send("Searched by Subject" + "\n"+ data);
    }
    else if(await course.find({Course_Instructor: Instructor_FirstName, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours -_id').length == 0)
    {
            res.status(200).send("Subject Not Found");
            console.log("Subject Not Found");
        } 
    else{
        var data = await course.find({Course_Instructor: Instructor_FirstName, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours -_id')
        res.status(200).send("Searched by Subject" + "\n"+ data);
      }
        
  });

  router.get("/filterPriceInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const FilterPrice= req.body.FilterPrice
    
    var data= await course.find({Course_Instructor:Instructor_FirstName,Course_Price: FilterPrice},'Course_Title Course_Rating Course_Hours -_id')
    res.status(200).send("Filtered by Price"+"\n"+ data);
  });

  router.get("/filterSubjectInst", async (req, res) => {
    const x = req.body.Instructor_ID
    const {FilterSubject} = req.body
    console.log(await course.find({Course_Instructor: x, Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send("Filtered by Subject");
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create a multiple choice exam with 4 choices per question
  router.post("/createExam", async (req, res) =>{
    var Question_Choices = [] ;
    var Question_Name;
    var allQuestions = req.body.questions;
    var arrayofQuestions = (JSON.stringify(allQuestions).split(","));
    var arrayQuestionID = [];
    var TotalGrade = 0;
    var j = 0;
    if(arrayofQuestions[0] === '""'){
      res.send("Cannot Create an Exam without Questions!");
    }
    else if(arrayofQuestions.length%7 != 0){
      res.send("Question fields are not complete!");
    }
    else {
      for (let i=0;i<arrayofQuestions.length;i+=7){
      var Question_ID = await Question.count().exec()+1;
      Question_Name = arrayofQuestions[i];
      Question_Choices[0] = arrayofQuestions[i+1] ;
      Question_Choices[1] = arrayofQuestions[i+2] ;
      Question_Choices[2] = arrayofQuestions[i+3] ;
      Question_Choices[3] = arrayofQuestions[i+4] ;
      Question_Correct_Answer = arrayofQuestions[i+5];
      Question_Grade = arrayofQuestions[i+6];
      TotalGrade += parseInt(arrayofQuestions[i+6]);
      arrayQuestionID[j++] = Question_ID;
      exams.createQuestion(Question_ID,Question_Name,Question_Choices,Question_Correct_Answer,Question_Grade);
      }

      var id = await Exam.count().exec()+1;
      exams.createExam(req, arrayQuestionID,TotalGrade,id);
      res.send("Exam Created");
    }
   
  })



  //define a promotion for the course (% discount) and for how long
  router.put("/course_promotion", async (req, res) =>{

    const {courseID} = req.body;
    const Discount = req.body.discount;
    const Duration = req.body.duration;
    if(Discount.length == 0){
      res.status(200).send("Discount value should not be empty!");
    }
    else if(Duration.length == 0){
      res.status(200).send("Discount duration should not be empty!");
    }
    else{
      const users = await course.findOneAndUpdate({Course_ID: courseID}, {Course_Discount: Discount, Course_Discount_Duration:Duration},{new: true});
      res.status(200).send(users);
    }
    
  });


module.exports=router;