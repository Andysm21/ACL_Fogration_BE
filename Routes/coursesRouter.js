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


// router.post('/createCourse', async (req,res)=>{
//     var id = await course.count().exec()+1;
//     courseRouter.createCourse(req,id)
//     res.send("Create a new course.")
// })

router.get("/getCourseIndividual", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')));
  });

  router.get("/getCourseGuest", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')));
  });

  router.get("/getCourseCorporate", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours -_id')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours -_id')));
  });

  router.get("/getCourseInstructor", async (req, res) => {
    const x = req.body.Course_Title
    console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')))
    res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')));
  });

  router.get("/filterRating", async (req, res) => {
    const {Course_Rating}= req.body
    console.log(await course.find({Course_Rating:Course_Rating},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Rating:Course_Rating},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/filterSubject", async (req, res) => {
    const {Course_Subject}= req.body
    console.log(await course.find({Course_Subject:Course_Subject},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Subject:Course_Subject},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/filterSubjectRating", async (req, res) => {
    const {Course_Subject}= req.body
    const {Course_Rating}= req.body
    console.log(await course.find({Course_Subject:Course_Subject,Course_Rating:Course_Rating},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Subject:Course_Subject,Course_Rating:Course_Rating},'Course_Title Course_Rating Course_Hours -_id' ));
  });

  router.get("/filterPrice", async (req, res) => {// for all but not for Corporate
    const {Course_Price}= req.body
    console.log(await course.find({Course_Price:Course_Price},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Price:Course_Price},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/SearchCourseTitle", async (req, res) => {
    const {Course_Title}= req.body
    console.log(await course.find({Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/SearchCourseSubject", async (req, res) => {
    const {Course_Subject}= req.body
    console.log(await course.find({Course_Subject:Course_Subject},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Subject:Course_Subject},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/SearchCourseIntrsuctor", async (req, res) => {
    const {Course_Instructor}= req.body
    console.log(await course.find({Course_Instructor:Course_Instructor},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Instructor:Course_Instructor},'Course_Title Course_Rating Course_Hours -_id'));
  });

  router.get("/viewCourses", async (req, res) => {
    console.log(await course.find({},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({},'Course_Title Course_Rating Course_Hours -_id'));
  });


  router.get("/hoverOnCourse", async (req, res) => {
    const Course_Title = req.body;
    var data = await course.find({Course_Title:Course_Title}).select('Course_Subtitle Course_Exam Course_Hours Course_Price Course_Discount -_id')+"\n";
    var method = await courseRouter.getHoursAllSubtitles(Course_Title);
    data += method
    res.send(data);
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