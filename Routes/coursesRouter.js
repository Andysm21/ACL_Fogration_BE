const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');

//to be changed later
router.post('/createCourse', (req,res)=>{
    courseRouter.createCourse(req)
    res.send("Create a new course.")
})

router.get("/getCourseIndividual", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/getCourseGuest", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/getCourseCorporate", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours')))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/getCourseInstructor", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/filterRating", async (req, res) => {
    const {FilterRating}= req.body
    console.log(await course.find({Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/filterSubject", async (req, res) => {
    const {FilterSubject}= req.body
    console.log(await course.find({Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/filterSubjectRating", async (req, res) => {
    const {FilterSubject}= req.body
    const {FilterRating}= req.body
    console.log(await course.find({Course_Subject:FilterSubject,Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/filterPrice", async (req, res) => {
    const {FilterPrice}= req.body
    console.log(await course.find({Course_Price:FilterPrice},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/SearchCourseTitle", async (req, res) => {
    const {SearchTitle}= req.body
    console.log(await course.find({Course_Title:SearchTitle},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/SearchCourseSubject", async (req, res) => {
    const {SearchSubject}= req.body
    console.log(await course.find({Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });

  router.get("/SearchCourseIntrsuctor", async (req, res) => {
    const {SearchInstructor}= req.body
    console.log(await course.find({Course_Instructor:SearchInstructor},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send("Courses In Terminal");
  });
module.exports=router;