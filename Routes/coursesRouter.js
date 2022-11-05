const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const Video = require('../Schemas/Video.js');
const sub = require('../Schemas/Subtitle.js');


//to be changed later
router.post('/createCourse', async (req,res)=>{
    var id = await course.count().exec()+1;
    courseRouter.createCourse(req,id)
    res.send("Create a new course.")
})

router.get("/getCourseIndividual", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')));
  });

  router.get("/getCourseGuest", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')));
  });

  router.get("/getCourseCorporate", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours')));
  });

  router.get("/getCourseInstructor", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price')));
  });

  router.get("/filterRating", async (req, res) => {
    const {FilterRating}= req.body
    console.log(await course.find({Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/filterSubject", async (req, res) => {
    const {FilterSubject}= req.body
    console.log(await course.find({Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/filterSubjectRating", async (req, res) => {
    const {FilterSubject}= req.body
    const {FilterRating}= req.body
    console.log(await course.find({Course_Subject:FilterSubject,Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Subject:FilterSubject,Course_Rating:FilterRating},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/filterPrice", async (req, res) => {
    const {FilterPrice}= req.body
    console.log(await course.find({Course_Price:FilterPrice},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Price:FilterPrice},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/SearchCourseTitle", async (req, res) => {
    const {SearchTitle}= req.body
    console.log(await course.find({Course_Title:SearchTitle},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Title:SearchTitle},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/SearchCourseSubject", async (req, res) => {
    const {SearchSubject}= req.body
    console.log(await course.find({Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/SearchCourseIntrsuctor", async (req, res) => {
    const {SearchInstructor}= req.body
    console.log(await course.find({Course_Instructor:SearchInstructor},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({Course_Instructor:SearchInstructor},'Course_Title Course_Rating Course_Hours'));
  });

  router.get("/viewCourses", async (req, res) => {
    console.log(await course.find({},'Course_Title Course_Rating Course_Hours'))
    res.status(200).send(await course.find({},'Course_Title Course_Rating Course_Hours'));
  });


  router.get("/hoverOnCourse", async (req, res) => {
    const CourseName = req.body.coursename;
    var data = await course.find({Course_Name:CourseName},'Course_Subtitle Course_Exam Course_Hours Course_Price Course_Discount')+"\n";
    data +=courseRouter.getHoursAllSubtitles(CourseName);
    res.status(200).send(data);
  });


//TO BE MOVED LATER WHEN WE CREATE THEIR ROUTERS AND THEIR CONTROLLERS
router.get("/createVideo", async (req, res) => {
  var id = await Video.count().exec()+1;
  courseRouter.createVideo(req,id)
  res.status(200).send("Video Created");

});

router.get("/createSubtitle", async (req, res) => {
  var id = await sub.count().exec()+1;
  courseRouter.createSubtitle(req,id)
  res.status(200).send("Subtitle Created");

});


module.exports=router;