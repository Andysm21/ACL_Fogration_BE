const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express = require("express")
const router = express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const StudentTookexam = require('../Schemas/StudentTookexam.js');
const StudentTakeCourse = require('../Schemas/StudentTakeCourse.js');
const Video = require('../Schemas/Video.js');
const sub = require('../Schemas/Subtitle.js');
const Instructor = require('../Schemas/Instructor.js');
const Course = require('../Schemas/Course.js');
const Subtitle = require('../Schemas/Subtitle.js');
const Question = require('../Schemas/Question.js');
const Exam = require('../Schemas/Exam.js');
const user = require('../Schemas/IndividualUser.js');
const corp = require('../Schemas/CorporateUser.js');
const Problem = require('../Schemas/Problem.js');
const CorpRequest = require('../Schemas/CorpRequest.js');
const RefundRequest = require('../Schemas/RefundRequest.js');
const sendCertificate = require("../utils/sendCertificate");
const review = require('../Schemas/StudentMadeReview.js');
const { array } = require('joi');


router.post("/createReview", async (req, res) => {
  var id = await review.count().exec() + 1;
  courseRouter.createReview(req, id);
  res.send("Created");
});

router.post("/updateReview", async (req, res) => {
  courseRouter.updateReview(req);
  res.send("Updated");
});

router.post("/deleteReview", async (req, res) => {
  courseRouter.deleteReview(req.body.id);
  res.send("Deleted");
});

router.post("/getReviewCourse", async (req, res) => {
  const reviews = await review.find({StudentMadeReview_CourseID: req.body.CourseID});
  res.send(reviews);
});


router.post("/getReviewInstructor", async (req, res) => {
  const reviews = await review.find({StudentMadeReview_InstructorID: req.body.InstructorID});
  res.send(reviews);
});





//to be changed later

// router.post('/createCourse', async (req,res)=>{
//     var id = await course.count().exec()+1;
//     courseRouter.createCourse(req,id)
//     res.send("Create a new course.")
// })

//7 view all the titles of the courses available 
//including the total hours of the course and course rating
//8 view the price of each course
router.get("/getCourseIndividual", async (req, res) => {
  console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')))
  res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price-_id')));
});
router.get("/getCourseGuest", async (req, res) => {
  console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')))
  res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price -_id')));

  const { Course_Subject } = req.body
  const { Course_Rating } = req.body
  var data = await course.find({}, 'Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT
    }
    final.push(data1)
  }
  res.status(200).send(final);
});
router.get("/getCourseCorporate", async (req, res) => {
  console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours -_id')))
  res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours -_id')));
});
router.get("/getCourseInstructor", async (req, res) => {
  console.log(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price-_id')))
  res.status(200).send(await (await course.find().select('Course_Title Course_Rating Course_Hours Course_Price-_id')));
});
//9 filter the courses based on a subject and/or rating
router.post("/filterRating", async (req, res) => {
  const { Course_Rating } = req.body
  var data = await course.find({ Course_Rating: Course_Rating }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[6].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //    console.log(CD)
    //    console.log(DataAlone)

    //Now Discount duration
    var CDD = DataAlone[7].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }
    final.push(data1)
  }
  res.status(200).send(final);
});

router.post("/filterSubject", async (req, res) => {

  const { Course_Subject } = req.body
  var data = await course.find({ Course_Subject: Course_Subject }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[6].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //    console.log(CD)
    //    console.log(DataAlone)

    //Now Discount duration
    var CDD = DataAlone[7].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }
    final.push(data1)
  }
  res.status(200).send(final);
});

router.post("/filterSubjectRating", async (req, res) => {

  const { Course_Subject } = req.body
  const { Course_Rating } = req.body
  var data = await course.find({ Course_Subject: Course_Subject, Course_Rating: Course_Rating }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[6].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //    console.log(CD)
    //    console.log(DataAlone)

    //Now Discount duration
    var CDD = DataAlone[7].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }
    final.push(data1)
  }
  res.status(200).send(final);
});
router.get("/viewCoursesALL", async (req, res) => {

  var data = await course.find({}).select('Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee Course_ID Course_Discount_Duration Course_Discount -_id')
  //  console.log(data)
  // var data1= await course.find({}).select('Course_Discount_Duration Course_Discount Course_ID -_id')
  var final = []
  // var JustID= await course.find({}).select('Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee Course_ID -_id')

  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;
    //   console.log(DataAlone)
    //Now Doing Trainees

    //console.log(DataAlone)

    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[1].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country

    //console.log(DataAlone)

    var CC = DataAlone[6].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[2].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[3].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[5].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now DOing ID
    var CI = DataAlone[0].split(':')
    CI = CI[1].split("'")
    CI = CI[0]
    //Now Discount
    var CD = DataAlone[7].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //Now Discount duration
    var CDD = DataAlone[8].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    // console.log(DataAlone)
    data1 = {
      "Course_ID": CI,
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }
    final.push(data1)
  }
  // console.log(123)

  res.send(final)
});

//10 filter the courses based on price (price can be FREE)
router.post("/filterPrice", async (req, res) => {// for all but not for Corporate
  const FilterPriceLower = req.body.FilterPrice1
  const FilterPriceHigher = req.body.FilterPrice2
  var data = await course.find({}, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
  //console.log(data)
  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    //console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[6].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //    console.log(CD)
    //    console.log(DataAlone)

    //Now Discount duration
    var CDD = DataAlone[7].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }

    if (Number(FilterPriceLower) <= Number(CP)) {
      if (Number(CP) <= Number(FilterPriceHigher)) {
        console.log(CP)
        console.log(FilterPriceLower)
        console.log(FilterPriceHigher)
        final.push(data1)
      }
    }
  }
  console.log(final)
  res.status(200).send(final);
});
//11 search for a course based on course title or subject or instructor
router.post("/SearchCourseTitle", async (req, res) => {
  const { Course_Title } = req.body
  var data = await course.find({ Course_Title: Course_Title }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
  //console.log(data)
  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    //console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[7].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //Now Discount duration
    var CDD = DataAlone[8].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    CDD = CDD.split("[")
    CDD = CDD[1].split(']')
    CDD = CDD[0]
    console.log("hi")
    console.log(CDD)
    console.log("bye")
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }
  }
  final.push(data1)
  console.log(final)
  res.status(200).send(final);
});
router.post("/SearchCourseSubject", async (req, res) => {
  const { Course_Subject } = req.body
  var data = await course.find({ Course_Subject: Course_Subject }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    //console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[7].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //Now Discount duration
    var CDD = DataAlone[8].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    CDD = CDD.split("[")
    CDD = CDD[1].split(']')
    CDD = CDD[0]
    console.log("hi")
    console.log(CDD)
    console.log("bye")
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }

  }
  final.push(data1)
  console.log(final)
  res.status(200).send(final);
});
router.post("/SearchCourseIntrsuctor", async (req, res) => {
  const { Course_Instructor } = req.body

  var data = await course.find({ Course_Instructor: Course_Instructor }, 'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    //console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    //Now Discount
    var CD = DataAlone[7].split(':')
    CD = CD[1].split("'")
    CD = CD[0]
    //Now Discount duration
    var CDD = DataAlone[8].split(':')
    CDD = CDD[1].split("'")
    CDD = CDD[0]
    CDD = CDD.split("[")
    CDD = CDD[1]
    console.log(CDD)
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT,
      "Course_Discount": CD,
      "Course_Discount_Duration": CDD
    }

  }
  final.push(data1)
  console.log(final)
  res.status(200).send(final);
});
router.get("/viewCourses", async (req, res) => {

  var data = await course.find({}, 'Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')

  var final = []
  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;

    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[0].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    //console.log(DataAlone)
    var CC = DataAlone[5].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[1].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[2].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[4].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    data1 = {
      "Course_Title": CT,
      "Course_Price": CP,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT
    }

  }
  final.push(data1)
  console.log(final)
  res.status(200).send(final);
});

//Salma's Single Course Method
router.post("/viewCourse/:id", async (req, res) => {


  if (req.params.id == "null") {
    console.log("Moshkela")
  }
  else {
    console.log("TEST")
    console.log(req.params.id)
    console.log(req.params.id == "null")
    var hours = 0;
    const ID = req.params.id
    var views = await course.findOne({ Course_ID: Number(ID) }).select('Course_Views -_id');
    var x = JSON.stringify(views)
    console.log(123, x)
    x = x.split(":")
    x = x[1].split("{")
    x = x[0].split("}")
    x = Number(x[0]) + 1

    await course.updateOne({ Course_ID: Number(ID) }, { Course_Views: (x) })
    // var test =ID.split(":")
    // console.log(test)
    const courses = await course.find({ Course_ID: Number(ID) }, '-_id');
    //console.log(courses);
    var { Course_Subtitle } = courses[0];
    var subtitle = []
    var videos = []
    for (let i = 0; i < Course_Subtitle.length; i++) {
      var tempVideo = [];
      console.log("HELLO: " + Course_Subtitle)
      subtitleTemp = await Subtitle.find({ Subtitle_ID: Course_Subtitle[i] }, '-_id');
      //console.log(subtitleTemp);
      var { Subtitle_Video } = subtitleTemp[0];

      for (let j = 0; j < Subtitle_Video.length; j++) {

        //console.log(Subtitle_Video[j]);
        var videosTemp = await Video.find({ Video_ID: Subtitle_Video[j] }, '-_id');
        hours = hours + Number(videosTemp[0].Video_Length);
        const Videos = {
          Video_ID: videosTemp[0].Video_ID,
          Video_Link: videosTemp[0].Video_Link,
          Video_Subtitle: videosTemp[0].Video_Subtitle,
          Video_Description: videosTemp[0].Video_Description,
          Video_Length: videosTemp[0].Video_Length
        }
        tempVideo[j] = Videos;

      }

      videos[i] = tempVideo;
      const subtitleObj = {
        Subtitle_ID: subtitleTemp[0].Subtitle_ID,
        Subtitle_Name: subtitleTemp[0].Subtitle_Name,
        Subtitle_Course_ID: subtitleTemp[0].Subtitle_Name,
        Subtitle_Video: videos[i],
        Subtitle_Hours: subtitleTemp[0].Subtitle_Hours
      }

      // console.log(subtitleObj);
      subtitle[i] = subtitleObj;
    }
    // console.log(subtitle);
    var exams = courses[0].Course_Exam;
    var ExamObj = [];
    for (let i = 0; i < exams.length; i++) {
      const ExamTemp = await Exam.find({ Exam_ID: exams[i] }, '-_id');
      var QuestionObj = [];
      // console.log(ExamTemp);
      for (let j = 0; j < ExamTemp[0].Exam_Question_ID.length; j++) {
        var qq = await Question.find({ Question_ID: ExamTemp[0].Exam_Question_ID[j] }, '-_id');
        //console.log(qq)
        qq = qq[0];
        const tempQ = {
          Question_ID: qq.Question_ID,
          Question_Name: qq.Question_Name,
          Question_choices: qq.Question_choices,
          Question_Correct_Answers: qq.Question_Correct_Answers,
          Question_Grade: qq.Question_Grade,
        }

        QuestionObj[j] = tempQ;
      }
      const exam = {
        Exam_ID: exams[0].Exam_ID,
        Exam_Question_ID: QuestionObj,
        Exam_Grade: exams[0].Exam_Grade,
        Exam_Instructor_ID: exams[0].Exam_Instructor_ID,
        Exam_Course_ID: exams[0].Exam_Course_ID
      }
      ExamObj[i] = exam;
    }

    var instructor = await Instructor.findOne({ Instructor_ID: courses[0].Course_Instructor }).select('-_id -createdAt -updatedAt -__v')
    //.select('Instructor_ID Instructor_FirstName -_id');
    //instructor = instructor[0];

    //console.log(instructor);
    
    console.log(await course.updateOne({ Course_ID: courses[0].Course_ID } , {Course_Hours: Math.ceil(hours/60)}))

    const CourseT = {
      Course_ID: courses[0].Course_ID,
      Course_Title: courses[0].Course_Title,
      Course_Subject: courses[0].Course_Subject,
      Course_Description: courses[0].Course_Description,
      Course_Price: courses[0].Course_Price,
      Course_Rating: courses[0].Course_Rating,
      Course_Instructor: instructor,
      // {
      //   Instructor_ID: instructor.Instructor_ID,
      //   Instructor_FirstName: instructor.Instructor_FirstName,
      //   Instructor_LastName: instructor.Instructor_LastName
      // },
      Course_Country: courses[0].Course_Country,
      Course_Discount: courses[0].Course_Discount,
      Course_Discount_Duration: courses[0].Course_Discount_Duration,
      Course_Subtitle: subtitle,
      Course_Trainee: courses[0].Course_Trainee.length,
      Course_Review: courses[0].Course_Review,
      Course_Rate: courses[0].Course_Rate,
      Course_Exam: ExamObj,
      Course_Video_Preview: courses[0].Course_Video_Preview,
      Course_Views: courses[0].Course_Views,
      Course_Hours: Math.ceil(hours/60)
    };
    //console.log(Course.Course_ID);
    //console.log(courses[0].Course_Trainee.length);
    res.send(CourseT);
    console.log("HI")
  }
})

//view course with progress and exam grade
router.post("/viewMyCourse/:id", async (req, res) => {
  var id = req.params.id;
  var userId = req.body.UserID
  var type = req.body.type
  var hours = 0;
  if (req.params.id == "null") {
    console.log("Moshkela")
  }
  else {
    var courseID;
    var progress;
    await (await StudentTakeCourse.find({ StudentTakeCourse_StudentID: userId, StudentTakeCourse_Type: type, StudentTakeCourse_CourseID: id })).map((ex) => {
      progress = ex.StudentTakeCourse_Progress;
    }
    )

    const courses = await course.find({ Course_ID: Number(id) }, '-_id');

    // console.log(courses);
    var { Course_Subtitle } = courses[0];
    var subtitle = []
    var videos = []
    for (let i = 0; i < Course_Subtitle.length; i++) {
      var tempVideo = [];
      subtitleTemp = await Subtitle.find({ Subtitle_ID: Course_Subtitle[i] }, '-_id');
      //console.log(subtitleTemp);
      var { Subtitle_Video } = subtitleTemp[0];

      for (let j = 0; j < Subtitle_Video.length; j++) {

        //console.log(Subtitle_Video[j]);
        var videosTemp = await Video.find({ Video_ID: Subtitle_Video[j] }, '-_id');
        hours = hours + Number(videosTemp[0].Video_Length);

        const Videos = {
          Video_ID: videosTemp[0].Video_ID,
          Video_Link: videosTemp[0].Video_Link,
          Video_Subtitle: videosTemp[0].Video_Subtitle,
          Video_Description: videosTemp[0].Video_Description,
          Video_Length: videosTemp[0].Video_Length
        }
        tempVideo[j] = Videos;

      }
      videos[i] = tempVideo;
      const subtitleObj = {
        Subtitle_ID: subtitleTemp[0].Subtitle_ID,
        Subtitle_Name: subtitleTemp[0].Subtitle_Name,
        Subtitle_Course_ID: subtitleTemp[0].Subtitle_Name,
        Subtitle_Video: videos[i],
        Subtitle_Hours: subtitleTemp[0].Subtitle_Hours
      }

      // console.log(subtitleObj);
      subtitle[i] = subtitleObj;
    }
    // console.log(subtitle);
    var exams = courses[0].Course_Exam;

    var ExamObj = [];
    var grade = 0;
    for (let i = 0; i < exams.length; i++) {
      var x = await StudentTookexam.find({ StudentTookExam_Student_ID: userId, StudentTookExam_Type: type, StudentTookExam_Exam_ID: exams[i] });
      if (x.length > 0) {
        await (await StudentTookexam.find({ StudentTookExam_Student_ID: userId, StudentTookExam_Type: type, StudentTookExam_Exam_ID: exams[i] })).map((ex) => {
          grade = ex.StudentTookExam_Grades;
        }
        )
      }
      else {
        grade = 0;
      }
      // console.log(grade);
      const ExamTemp = await Exam.find({ Exam_ID: exams[i] }, '-_id');

      var QuestionObj = [];
      // console.log(ExamTemp);
      for (let j = 0; j < ExamTemp[0].Exam_Question_ID.length; j++) {
        var qq = await Question.find({ Question_ID: ExamTemp[0].Exam_Question_ID[j] }, '-_id -createdAt -updatedAt -__v');
        // console.log(qq)
        qq = qq[0];
        const tempQ = {
          Question_ID: qq.Question_ID,
          Question_Name: qq.Question_Name,
          Question_choices: qq.Question_choices,
          Question_Correct_Answers: qq.Question_Correct_Answers,
          Question_Grade: qq.Question_Grade,

        }

        QuestionObj.push(tempQ);

      }


      const exam = {
        Exam_ID: ExamTemp[0].Exam_ID,
        Exam_Question_ID: QuestionObj,
        Exam_Grade: ExamTemp[0].Exam_Grade,
        Exam_Instructor_ID: ExamTemp[0].Exam_Instructor_ID,
        Exam_Course_ID: ExamTemp[0].Exam_Course_ID,
        Exam_Grade: grade,
      }
      ExamObj.push(exam)
    }

    var instructor = await Instructor.findOne({ Instructor_ID: courses[0].Course_Instructor }).select('-id -createdAt -updatedAt -_v')
    //.select('Instructor_ID Instructor_FirstName -_id');
    //instructor = instructor[0];

    //console.log(instructor);
    const CourseT = {
      Course_ID: courses[0].Course_ID,
      Course_Title: courses[0].Course_Title,
      Course_Subject: courses[0].Course_Subject,
      Course_Description: courses[0].Course_Description,
      Course_Price: courses[0].Course_Price,
      Course_Rating: courses[0].Course_Rating,
      Course_Instructor: instructor,
      // {
      //   Instructor_ID: instructor.Instructor_ID,
      //   Instructor_FirstName: instructor.Instructor_FirstName,
      //   Instructor_LastName: instructor.Instructor_LastName
      // },
      Course_Country: courses[0].Course_Country,
      Course_Discount: courses[0].Course_Discount,
      Course_Discount_Duration: courses[0].Course_Discount_Duration,
      Course_Subtitle: subtitle,
      Course_Trainee: courses[0].Course_Trainee.length,
      Course_Review: courses[0].Course_Review,
      Course_Rate: courses[0].Course_Rate,
      Course_Exam: ExamObj,
      Course_Progress: progress,
      Course_Hours: Math.floor(hours / 60)

    };
    //console.log(Course.Course_ID);
    //console.log(courses[0].Course_Trainee.length);
    // console.log(QuestionObj)
    // console.log("END")
    // console.log(CourseT)

    res.send(CourseT)
  }
})

//DONE 3ANDY All Courses For Guest/Individual/Instructor by Andrew
// router.get("/viewCoursesALL", async (req, res) => {

//   var data= await course.find({}).select('Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee Course_ID -_id')
//   var final= []


//   for(let i =0;i<data.length;i++)
//   {
//     var test1= JSON.stringify(data[i])

//       var arrayException=test1.split("[")
//       var DataAlone=test1.split(",")
//       var data1;
//   //Now Doing Trainees
//   var CTT= arrayException[1].split(',')
//   CTT= Number(CTT.length)
//   //Now Doing CourseTitle
//       var CT= DataAlone[0].split(':"')
//       CT=CT[1].split('"')
//       CT=CT[0]
//   //Now Doing Country
//   console.log(DataAlone)
//       var CC= DataAlone[5].split(':"')
//       CC=CC[1].split('"')
//       CC=CC[0]
//   //Course Instructor ID and Name JSON FILE
//       test1=test1.split('"Course_Instructor":');
//       test1=test1[1].split(",");
//       var InstId=Number(test1[0])
//       var X = await Instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
//   //Now Doing Course_Price
//   var CP= DataAlone[1].split(':')
//   CP=CP[1].split("'")
//   CP=CP[0]
//   //Now DOing Course_Rating
//   var CR= DataAlone[2].split(':')
//   CR=CR[1].split("'")
//   CR=CR[0]
//   //Now DOing Course_Hours
//   var CH= DataAlone[4].split(':')
//   CH=CH[1].split("'")
//   CH=CH[0]
//   console.log(DataAlone)
//     //Now DOing Course_Hours
//     var CI= DataAlone[].split(':')
//     CI=CI[1].split("'")
//     CI=CI[0]
//    data1 = {
//         "Course_ID" :
//         "Course_Title": CT,
//         "Course_Price": CP,
//         "Course_Rating": CR,
//         "Course_Instructor": X,
//         "Course_Hours": CH,
//         "Course_Country": CC,
//         "Course_Trainee": CTT
//     }
//     final.push(data1)
//   }

//   res.send(final)
//   });


router.get("/viewCoursesCorporate", async (req, res) => {
  const x = req.body.User_ID
  var data = await course.find({}).select('Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee Course_ID -_id')
  var final = []


  for (let i = 0; i < data.length; i++) {
    var test1 = JSON.stringify(data[i])

    var arrayException = test1.split("[")
    var DataAlone = test1.split(",")
    var data1;
    console.log(DataAlone)
    var CID = DataAlone[0].split(":")
    CID = CID[1].split("'")
    CID = CID[0]
    //Now Doing Trainees
    var CTT = arrayException[1].split(',')
    CTT = Number(CTT.length)
    //Now Doing CourseTitle
    var CT = DataAlone[1].split(':"')
    CT = CT[1].split('"')
    CT = CT[0]
    //Now Doing Country
    console.log(DataAlone)
    var CC = DataAlone[6].split(':"')
    CC = CC[1].split('"')
    CC = CC[0]
    //Course Instructor ID and Name JSON FILE
    test1 = test1.split('"Course_Instructor":');
    test1 = test1[1].split(",");
    var InstId = Number(test1[0])
    var X = await Instructor.findOne({ Instructor_ID: InstId }).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP = DataAlone[2].split(':')
    CP = CP[1].split("'")
    CP = CP[0]
    //Now DOing Course_Rating
    var CR = DataAlone[3].split(':')
    CR = CR[1].split("'")
    CR = CR[0]
    //Now DOing Course_Hours
    var CH = DataAlone[5].split(':')
    CH = CH[1].split("'")
    CH = CH[0]
    data1 = {
      "Course_ID": CID,
      "Course_Title": CT,
      "Course_Rating": CR,
      "Course_Instructor": X,
      "Course_Hours": CH,
      "Course_Country": CC,
      "Course_Trainee": CTT
    }
    final.push(data1)
  }
  console.log(final)
  res.send(final)
});

// 12 choose a course from the results and view (but not open) 
//its details including course subtitles, excercises , total hours of each subtitle, 
//total hours of the course 
//and price (including % discount if applicable) according to the country selected
router.get("/hoverOnCourse", async (req, res) => {
  const Course_Title = req.body.Course_Title;
  var data = await course.find({ Course_Title: Course_Title }).select('Course_Subtitle Course_Exam Course_Hours Course_Price Course_Discount -_id') + "\n";
  var method = await courseRouter.getHoursAllSubtitles(Course_Title);
  data += method
  // console.log(data)
  res.send(data);
});

//TO BE MOVED LATER WHEN WE CREATE THEIR ROUTERS AND THEIR CONTROLLERS
router.post("/createVideo", async (req, res) => {
  var id = await Video.count().exec() + 1;
  if (req.body.link == null || req.body.link == "" || req.body.description == null || req.body.description == ""
    || req.body.subtitle == null || req.body.subtitle == "")
    res.send("Please fill all required fields")
  else {
    console.log(req.body);
    courseRouter.createVideo(req, id);


    //update Subtitle Hours
    const { Subtitle_Hours } = await Subtitle.findOne({ Subtitle_ID: parseInt(req.body.subtitle) }, 'Subtitle_Hours');
    const newSubtitle = Subtitle_Hours + 10;
    await Subtitle.updateOne({ Subtitle_ID: req.body.subtitle }, { Subtitle_Hours: newSubtitle });


    Subtitle.updateOne({ Subtitle_ID: Number(req.body.subtitle) }, { Subtitle_Hours: 10 });
    await Subtitle.updateOne(
      { Subtitle_ID: req.body.subtitle },
      {
        $push: {
          Subtitle_Video: {
            $each: [id],
            $position: 0
          }
        }
      }).exec()
    res.status(200).send(id + "");
  }

  // res.status(200).send("Video Created");

  //res.send("ok");

});

router.post("/createSubtitle", async (req, res) => {
  var id = await sub.count().exec() + 1;
  console.log(req.body);
  if (req.body.Subtitle == null || req.body.Subtitle == "" || req.body.Subtitle_Course_ID == null || req.body.Subtitle_Course_ID == "")
    res.send("Please fill all required fields")
  else {
    courseRouter.createSubtitle(req, id)
    await course.updateOne(
      { Course_ID: req.body.Subtitle_Course_ID },
      {
        $push: {
          Course_Subtitle: {
            $each: [id],
          }
        }
      }).exec()
    res.status(200).send(id + "");
  }


});

router.get("/getAccess", async (req, res) => {
  var id_Course = req.body.Course_ID;
  var id_Trainee = req.body.User_ID;
  var course_array = await course.find({ Course_ID: id_Course }).select('Course_Trainee -_id');
  var constant = null;
  var x = (JSON.stringify(course_array).split(":"));
  var z = x[1].split(" ");
  var y = z[0].split("]");
  var yy = y[0].split("[");
  var final = yy[1].split(',');
  for (let i = 0; i < final.length; i++) {
    if (Number(final[i]) == (id_Trainee))
      constant = id_Course;
  }
  return (constant);
});

router.post("/RatingInstructor", async (req, res) => {
  await Instructor.updateOne(
    { Instructor_ID: req.body.ID },
    {
      $push: {
        Instructor_Ratings: {
          $each: [Number(req.body.Rating)],
          $position: 0
        }
      }
    }).exec()
  res.status(200).send(await Instructor.find({ Instructor_ID: req.body.ID }).select('Instructor_Ratings -_id'));

});

router.post("/RatingCourse", async (req, res) => {
  console.log(req.body);
  await Course.updateOne(
    { Course_ID: Number(req.body.ID) },
    {
      $push: {
        Course_Rate: {
          $each: [Number(req.body.Rating)],
          $position: 0
        }
      }
    }).exec()
  var rating = 0;
  var { Course_Rate } = await Course.findOne({ Course_ID: req.body.ID }, 'Course_Rate');
  for (let i = 0; i < Course_Rate.length; i++) {
    rating += Course_Rate[i];
  }
  rating = rating / Course_Rate.length;
  await Course.updateOne({ Course_ID: req.body.ID }, { Course_Rating: rating });
  const { Course_Rating } = await Course.findOne({ Course_ID: req.body.ID }).select('Course_Rating -_id').exec();
  console.log(Course_Rating);
  res.send(Course_Rating + "");

});

router.get("/getAccessToWatch", async (req, res) => {
  var id_Video = req.body.VID;
  var id_user = req.body.UserID;
  var Type = req.body.Type
  var subtitle = await Video.findOne({ Video_ID: id_Video }).select('Video_Subtitle -_id');
  var Data = (JSON.stringify(subtitle).split(":"));
  var data2 = Data[1].split("}");
  var finalbgd = data2[0].split('"')
  var CC = await Subtitle.findOne({ Subtitle_Name: finalbgd[1] }).select("Subtitle_Course_ID -_id")
  var dataa = (JSON.stringify(CC).split(":"));
  console.log(CC)
  var ID = (dataa[1].split("}"))
  var CourseID = Number(ID[0]);

  var verify = null;
  verify = await StudentTakeCourse.find({ StudentTakeCourse_CourseID: CourseID, StudentTakeCourse_StudentID: id_user, StudentTakeCourse_Type: Type })
  var verify2 = null;
  var temp = (JSON.stringify(await Course.findOne({ Course_ID: CourseID }).select('Course_Subtitle -_id')).split(":"))
  console.log(temp)
  var a = ((temp[1]).split(","));
  console.log(a)
  var array = []
  var data = ""
  for (let i = 0; i < a.length; i++) {
    if (a[i] != "[" & a[i] != '"' & a[i] != "]")
      data += a[i];
  }
  data = data.split(",")
  data = data[0].split('"')
  for (let i = 0; i < data.length; i++) {
    if (i % 2 != 0) {
      array.push(data[i])
    }
  }
  for (let i = 0; i < array.length; i++) {
    if (finalbgd[1] == array[i]) {
      verify2 = 1;
    }
  }
  if (verify = null) {
    res.send("Student not in course")
  }
  else {
    if (verify2 == null) {
      res.send("Subtitle doesnt belong to course")
    }
    else {
      var constant = null;
      var video_subtitle = finalbgd[1]
      var x = (JSON.stringify(video_subtitle).split(":"));
      var z = x[0].split('"');
      var subtitle_course = CourseID;

      var course_array = await course.find({ Course_ID: subtitle_course }).select('Course_Trainee -_id');
      var a = (JSON.stringify(course_array).split(":"));
      var b = a[1].split(" ");
      var c = b[0].split("]");
      var d = c[0].split("[");
      var final = d[1].split(',');
      for (let i = 0; i < final.length; i++) {
        if (Number(final[i]) == (id_user))
          constant = await Video.find({ Video_ID: id_Video }).select('Video_Link -_id');
      }
      res.send(constant)

    }
  }
});
//PLEASE INSERT TYPE HERE
router.post("/SubmitAnswers", async (req, res) => {
  var id_question = req.body.QID;
  var id_exam = req.body.EID;
  var id_user = req.body.UserID;
  var answer = Number(req.body.answer);
  var exam_course = await Exam.findOne({ Exam_ID: id_exam }).select('Exam_Course_ID -_id');
  // var x = (JSON.stringify(exam_course).split(":"));
  // var z= x[1].split('"');
  var course_array = await course.find({ Course_ID: exam_course.Exam_Course_ID }).select('Course_Trainee -_id');
  var constant = 0;
  var x = (JSON.stringify(course_array).split(":"));
  var z = x[1].split(" ");
  var y = z[0].split("]");
  var yy = y[0].split("[");
  var final = yy[1].split(',');
  for (let i = 0; i < final.length; i++) {
    if (Number(final[i]) == (id_user))
      constant = 1;
  }
  //verified that trainee enrolled in course
  if (constant == 1) {
    var question_array = await Exam.find({ Exam_ID: id_exam }).select('Exam_Question_ID -_id');
    var indexquestion = -1;
    var x = (JSON.stringify(question_array).split(":"));
    var z = x[1].split(" ");
    var y = z[0].split("]");
    var yy = y[0].split("[");
    var final = yy[1].split(',');
    var total = 0;
    for (let i = 0; i < final.length; i++) {
      total++;
      if (Number(final[i]) == (id_question))
        indexquestion = i;
    }
    if (indexquestion == -1) {
      res.send("Wrong Question ID")
    }
    else {
      console.log("The Answer is " + answer)
      await StudentTookexam.update(
        { StudentTookExam_Exam_ID: id_exam },
        {
          $set: {
            [`StudentTookExam_Answers.${indexquestion}`]: answer,
            // [`StudentTookExam_Answers.${indexquestion}`]:answer,

          }
        }).exec()
      await StudentTookexam.updateOne({ StudentTookExam_Exam_ID: id_exam, StudentTookExam_Student_ID: id_user, StudentTookExam_Type: req.body.Type },
        {
          $set: {
            StudentTookExam_Flag:
              true

          }
        })
      res.send("done");
    }
  }



});

router.post('/createStudentTakeExam', async (req, res) => {
  var id = await StudentTookexam.count().exec() + 1;
  var Found = await StudentTookexam.findOne({
    StudentTookExam_Student_ID: req.body.StudentTookExam_Student_ID,
    StudentTookExam_Exam_ID: req.body.StudentTookExam_Exam_ID, StudentTookExam_Type: req.body.StudentTookExam_Type
  }).select(' _id');
  if (Found == null) {
    courseRouter.createStudentTakeExam(req, id)
    var CourseID = await Exam.findOne({ Exam_ID: req.body.StudentTookExam_Exam_ID }).select('Exam_Course_ID -_id');
    await StudentTakeCourse.updateOne({ StudentTakeCourse_CourseID: CourseID.Exam_Course_ID, StudentTakeCourse_StudentID: req.body.StudentTookExam_Student_ID },
      {

        $push: {
          StudentTakeCourse_StudentTakeExam: {
            id
          }
        }
      })

    var myexam = await (await Exam.find({ Exam_ID: req.body.StudentTookExam_Exam_ID }).select('Exam_Question_ID -_id'))
    var indexquestion = 0;
    var x = (JSON.stringify(myexam).split(":"));
    var z = x[1].split(" ");
    var y = z[0].split("]");
    var yy = y[0].split("[");
    var final = yy[1].split(',');
    var total = 0;
    for (let i = 0; i < final.length; i++) {
      total++;
    }
    var EX = await (await Exam.findOne({ Exam_ID: req.body.StudentTookExam_Exam_ID }).select('Exam_Question_ID -_id'))
    for (let i = 0; i < EX.Exam_Question_ID.length; i++) {
      await StudentTookexam.updateOne(
        { StudentTookExam_Exam_ID: req.body.StudentTookExam_Exam_ID },
        {
          $push: {
            StudentTookExam_Answers: {
              $each: [null],
            }
          }
        }
      ).exec()
    }

    res.send(false)
  }
  else {
    // await StudentTookexam.updateOne(
    //   { StudentTookExam_Student_ID:req.body.StudentTookExam_Student_ID,
    //     StudentTookExam_Exam_ID:req.body.StudentTookExam_Exam_ID,StudentTookExam_Type:req.body.StudentTookExam_Type},
    //   { 
    //     $set: { 
    //       StudentTookExam_Flag:true,
    //      } 
    //    }
    //   ).exec()
    res.send(true)
  }
})

//Andrew's
/*router.post('/enrollInCourse', async (req,res)=>{
  var id = await StudentTakeCourse.count().exec()+1;

  courseRouter.createStudentTakeCourse(req,id)

res.send("done")
})*/

router.post('/retakeExam', async (req, res) => {
  var UserID = Number(req.body.UserID);
  var EID = Number(req.body.EID);
  var Type = Number(req.body.Type);

  await StudentTookexam.updateOne(
    { StudentTookExam_Exam_ID: EID, StudentTookExam_Student_ID: UserID, StudentTookExam_Type: Type },
    {
      $set: {
        StudentTookExam_Answers: {
        },
        StudentTookExam_Flag: false,
      }

    }
  ).exec()

})
router.post('/examGrades', async (req, res) => {
  var UserID = Number(req.body.UserID);
  var EID = Number(req.body.EID);
  var Type = Number(req.body.Type);
  var TotalRight = 0;
  var CourseID = await Exam.find({ Exam_ID: EID }).select('Exam_Course_ID -_id');
  //JSON SPLITTING SHIT
  var data = (JSON.stringify(CourseID).split(":"));
  var ID = (data[1].split("}"))
  var CourseID = Number(ID[0]);
  console.log(ID)

  var verify = null;
  verify = await StudentTakeCourse.find({ StudentTakeCourse_CourseID: CourseID, StudentTakeCourse_StudentID: UserID, StudentTakeCourse_Type: Type })
  var verify2 = null;
  verify2 = await StudentTookexam.find({ StudentTookExam_Exam_ID: EID, StudentTookExam_Student_ID: UserID, StudentTookExam_Type: Type })
  if (verify = null) {
    res.send("Student not in course")
  }
  else {
    if (verify2 = null) {
      res.send("Student didnt take exam yet")
    }
    else {



      var question_array = await Exam.find({ Exam_ID: EID }).select('Exam_Question_ID -_id');
      console.log(question_array)
      var x = (JSON.stringify(question_array).split(":"));
      var z = x[1].split(" ");
      var y = z[0].split("]");
      var yy = y[0].split("[");
      //ARray of Question IDS
      var FinalQuestionArray = yy[1].split(',');
      var StudentAns = await StudentTookexam.findOne({ StudentTookExam_Exam_ID: EID, StudentTookExam_Student_ID: UserID }).select('StudentTookExam_Answers -_id');

      var FinalStudentBEGAD = new Array(StudentAns?.StudentTookExam_Answers).fill(0);
      var FinalModelBEGAD = new Array(StudentAns?.StudentTookExam_Answers).fill(0);

      var TotalGrade = 0;
      var grade = 0;
      for (let i = 0; i < FinalQuestionArray.length; i++) {
        var ModelAnswerArray = await Question.find({ Question_ID: FinalQuestionArray[i] }).select('Question_Correct_Answers -_id')
        var x = (JSON.stringify(ModelAnswerArray).split(":"));
        var z = x[1].split("'");
        //THIS IS ANSWERS EL CORRECT
        var CorrectAnswer = z[0].split('"')
        //THIS IS ANSWERS EL STUDENT
        var Choices = await Question.findOne({ Question_ID: FinalQuestionArray[i] }).select('Question_Choices -_id');
        Choices = Choices.Question_Choices;
        //  Answeri=StudentAnswersArray[i].split('"');
        var Question_Grade = await Question.find({ Question_ID: FinalQuestionArray[i] }).select('Question_Grade -_id');
        var x = (JSON.stringify(Question_Grade).split(":"));
        var y = x[1].split("}")
        TotalGrade += Number(y[0])
        //Check if correctAnswer
        FinalStudentBEGAD[i] = Choices[Number(StudentAns?.StudentTookExam_Answers[i]) - 1]
        FinalModelBEGAD[i] = CorrectAnswer[1]

        if (FinalStudentBEGAD[i] == FinalModelBEGAD[i]) {
          TotalRight++;
          var Question_Grade = await Question.find({ Question_ID: Number(FinalQuestionArray[i]) }).select('Question_Grade -_id');
          var x = (JSON.stringify(Question_Grade).split(":"));
          var y = x[1].split("}")
          grade += Number(y[0])
        }
      }
      var Final = (Number(grade) / Number(TotalGrade)) * 100;
      await StudentTookexam.updateOne({ StudentTookExam_Exam_ID: EID, StudentTookExam_Student_ID: UserID, StudentTookExam_Type: Type }, { StudentTookExam_Grades: Final })
      var countExams = await Exam.find({ Exam_Course_ID: CourseID }).count().exec();
      var ExamIDs = [];
      await (await Exam.find({ Exam_Course_ID: CourseID })).map((Ex) => {
        ExamIDs.push(Ex.Exam_ID)
      })
      var progressPerExam = 100 / countExams;
      var progress = 0;
      while (ExamIDs.length > 0) {
        await (await StudentTookexam.find({ StudentTookExam_Exam_ID: ExamIDs.pop(), StudentTookExam_Student_ID: UserID, StudentTookExam_Type: Type })).map((Ex) => {
          if (Ex.StudentTookExam_Grades >= 50)
            progress += progressPerExam;
        })
      }

      await (StudentTakeCourse.updateOne({ StudentTakeCourse_CourseID: CourseID, StudentTakeCourse_StudentID: UserID, StudentTakeCourse_Type: Type }, { StudentTakeCourse_Progress: progress }))

      var coursename = await (course.find({ Course_ID: CourseID }, 'Course_Title -_id'))
      var x = (JSON.stringify(coursename).split(":"));
      var y = x[1].split("}")
      y = y[0] + " Certificate";

      //console.log(y)
      /*if(progress==100){
          var email;
          if(req.body.Type==1){
            await (await user.find({IndividualUser_ID:UserID})).map((co) => {
              email=co.individualUser_Email})
          }
          else{
            await (await corp.find({CorporateUser_ID:UserID})).map((co) => {
              email=co.CorporateUser_Email})
          }
            await sendCertificate(email,y, "Congratulations on completing the course!!");
          await StudentTakeCourse.remove({StudentTakeCourse_CourseID:CourseID,StudentTakeCourse_StudentID:UserID,StudentTakeCourse_Type:Type})
          
      }*/
      console.log({ Model: FinalModelBEGAD, Student: FinalStudentBEGAD, Grade: Final, TotalRight: TotalRight, Progress: progress })
      res.send({ Model: FinalModelBEGAD, Student: FinalStudentBEGAD, Grade: Final, TotalRight: TotalRight, Progress: progress, Course_ID: CourseID })
    }
  }
})

router.post('/myCoursesCorp', async (req, res) => {
  var id = req.body.ID;
  var STC = await StudentTakeCourse.findOne({ StudentTakeCourse_StudentID: id, StudentTakeCourse_Type: 2 }).select('StudentTakeCourse_CourseID -_id')
  console.log("H")
  console.log(STC)

  STC = JSON.stringify(STC).split(',');
  //console.log("HI")
  var ArrayOfCIDS = [];
  var ArrayOfCourses = [];
  if (STC[0] == '[]') {
    res.send();
  }
  else {
    for (let i = 0; i < STC.length; i++) {
      var x = STC[i].split(':')
      console.log(x)
      x = x[1].split('}')
      // console.log(x[0])
      ArrayOfCIDS.push(Number(x[0]))
    }
    // console.log(ArrayOfCIDS)
    for (let i = 0; i < ArrayOfCIDS.length; i++) {
      const courses = await course.find({ Course_ID: Number(ArrayOfCIDS[i]) }, '-_id');
      //console.log(courses);
      var { Course_Subtitle } = courses[0];
      var subtitle = []
      var videos = []
      for (let i = 0; i < Course_Subtitle.length; i++) {
        var tempVideo = [];
        subtitleTemp = await Subtitle.find({ Subtitle_ID: Course_Subtitle[i] }, '-_id');
        //console.log(subtitleTemp);
        var { Subtitle_Video } = subtitleTemp[0];

        for (let j = 0; j < Subtitle_Video.length; j++) {

          //console.log(Subtitle_Video[j]);
          var videosTemp = await Video.find({ Video_ID: Subtitle_Video[j] }, '-_id');
          const Videos = {
            Video_ID: videosTemp[0].Video_ID,
            Video_Link: videosTemp[0].Video_Link,
            Video_Subtitle: videosTemp[0].Video_Subtitle,
            Video_Description: videosTemp[0].Video_Description,
            Video_Length: videosTemp[0].Video_Length
          }
          tempVideo[j] = Videos;

        }
        videos[i] = tempVideo;
        const subtitleObj = {
          Subtitle_ID: subtitleTemp[0].Subtitle_ID,
          Subtitle_Name: subtitleTemp[0].Subtitle_Name,
          Subtitle_Course_ID: subtitleTemp[0].Subtitle_Name,
          Subtitle_Video: videos[i],
          Subtitle_Hours: subtitleTemp[0].Subtitle_Hours
        }

        // console.log(subtitleObj);
        subtitle[i] = subtitleObj;
      }
      // console.log(subtitle);
      var exams = courses[0].Course_Exam;
      var ExamObj = [];
      for (let i = 0; i < exams.length; i++) {
        const ExamTemp = await Exam.find({ Exam_ID: exams[i] }, '-_id');
        var QuestionObj = [];
        // console.log(ExamTemp);
        for (let j = 0; j < ExamTemp[0].Exam_Question_ID.length; j++) {
          var qq = await Question.find({ Question_ID: ExamTemp[0].Exam_Question_ID[j] }, '-_id');
          //console.log(qq)
          qq = qq[0];
          const tempQ = {
            Question_ID: qq.Question_ID,
            Question_Name: qq.Question_Name,
            Question_choices: qq.Question_choices,
            Question_Correct_Answers: qq.Question_Correct_Answers,
            Question_Grade: qq.Question_Grade,
          }

          QuestionObj[j] = tempQ;
        }
        const exam = {
          Exam_ID: exams[0].Exam_ID,
          Exam_Question_ID: QuestionObj,
          Exam_Grade: exams[0].Exam_Grade,
          Exam_Instructor_ID: exams[0].Exam_Instructor_ID,
          Exam_Course_ID: exams[0].Exam_Course_ID
        }
        ExamObj[i] = exam;
      }

      var instructor = await Instructor.findOne({ Instructor_ID: courses[0].Course_Instructor }).select('-_id -createdAt -updatedAt -__v')
      //.select('Instructor_ID Instructor_FirstName -_id');
      //instructor = instructor[0];

      //console.log(instructor);
      const CourseT = {
        Course_ID: courses[0].Course_ID,
        Course_Title: courses[0].Course_Title,
        Course_Subject: courses[0].Course_Subject,
        Course_Description: courses[0].Course_Description,
        Course_Price: courses[0].Course_Price,
        Course_Rating: courses[0].Course_Rating,
        Course_Instructor: instructor,
        // {
        //   Instructor_ID: instructor.Instructor_ID,
        //   Instructor_FirstName: instructor.Instructor_FirstName,
        //   Instructor_LastName: instructor.Instructor_LastName
        // },
        Course_Hours: courses[0].Course_Hours,
        Course_Country: courses[0].Course_Country,
        Course_Discount: courses[0].Course_Discount,
        Course_Discount_Duration: courses[0].Course_Discount_Duration,
        Course_Subtitle: subtitle,
        Course_Trainee: courses[0].Course_Trainee.length,
        Course_Review: courses[0].Course_Review,
        Course_Rate: courses[0].Course_Rate,
        Course_Exam: ExamObj
      };
      //console.log(Course.Course_ID);
      //console.log(courses[0].Course_Trainee.length);
      ArrayOfCourses.push(CourseT)

    }

    res.send(ArrayOfCourses)
  }
})

router.post('/myCoursesInd', async (req, res) => {
  var id = req.body.ID;
  var STC = await StudentTakeCourse.find({ StudentTakeCourse_StudentID: id, StudentTakeCourse_Type: 1 }).select('StudentTakeCourse_CourseID -_id')
  STC = JSON.stringify(STC).split(',');
  console.log(STC[0])
  var ArrayOfCIDS = [];
  var ArrayOfCourses = [];
  if (STC[0] == '[]') {
    res.send();
  }
  else {
    for (let i = 0; i < STC.length; i++) {
      var x = STC[i].split(':')
      x = x[1].split('}')
      console.log(x[0])
      ArrayOfCIDS.push(Number(x[0]))
    }

    for (let i = 0; i < ArrayOfCIDS.length; i++) {
      const courses = await course.find({ Course_ID: Number(ArrayOfCIDS[i]) }, '-_id');
      //console.log(courses);
      var { Course_Subtitle } = courses[0];
      var subtitle = []
      var videos = []
      for (let i = 0; i < Course_Subtitle.length; i++) {
        var tempVideo = [];
        subtitleTemp = await Subtitle.find({ Subtitle_ID: Course_Subtitle[i] }, '-_id');
        //console.log(subtitleTemp);
        var { Subtitle_Video } = subtitleTemp[0];

        for (let j = 0; j < Subtitle_Video.length; j++) {

          //console.log(Subtitle_Video[j]);
          var videosTemp = await Video.find({ Video_ID: Subtitle_Video[j] }, '-_id');
          const Videos = {
            Video_ID: videosTemp[0].Video_ID,
            Video_Link: videosTemp[0].Video_Link,
            Video_Subtitle: videosTemp[0].Video_Subtitle,
            Video_Description: videosTemp[0].Video_Description,
            Video_Length: videosTemp[0].Video_Length
          }
          tempVideo[j] = Videos;

        }
        videos[i] = tempVideo;
        const subtitleObj = {
          Subtitle_ID: subtitleTemp[0].Subtitle_ID,
          Subtitle_Name: subtitleTemp[0].Subtitle_Name,
          Subtitle_Course_ID: subtitleTemp[0].Subtitle_Name,
          Subtitle_Video: videos[i],
          Subtitle_Hours: subtitleTemp[0].Subtitle_Hours
        }

        // console.log(subtitleObj);
        subtitle[i] = subtitleObj;
      }
      // console.log(subtitle);
      var exams = courses[0].Course_Exam;
      var ExamObj = [];
      for (let i = 0; i < exams.length; i++) {
        const ExamTemp = await Exam.find({ Exam_ID: exams[i] }, '-_id');
        var QuestionObj = [];
        // console.log(ExamTemp);
        for (let j = 0; j < ExamTemp[0].Exam_Question_ID.length; j++) {
          var qq = await Question.find({ Question_ID: ExamTemp[0].Exam_Question_ID[j] }, '-_id');
          //console.log(qq)
          qq = qq[0];
          const tempQ = {
            Question_ID: qq.Question_ID,
            Question_Name: qq.Question_Name,
            Question_choices: qq.Question_choices,
            Question_Correct_Answers: qq.Question_Correct_Answers,
            Question_Grade: qq.Question_Grade,
          }

          QuestionObj[j] = tempQ;
        }
        const exam = {
          Exam_ID: exams[0].Exam_ID,
          Exam_Question_ID: QuestionObj,
          Exam_Grade: exams[0].Exam_Grade,
          Exam_Instructor_ID: exams[0].Exam_Instructor_ID,
          Exam_Course_ID: exams[0].Exam_Course_ID
        }
        ExamObj[i] = exam;
      }

      var instructor = await Instructor.findOne({ Instructor_ID: courses[0].Course_Instructor }).select('-_id -createdAt -updatedAt -__v')
      //.select('Instructor_ID Instructor_FirstName -_id');
      //instructor = instructor[0];

      //console.log(instructor);
      const CourseT = {
        Course_ID: courses[0].Course_ID,
        Course_Title: courses[0].Course_Title,
        Course_Subject: courses[0].Course_Subject,
        Course_Description: courses[0].Course_Description,
        Course_Price: courses[0].Course_Price,
        Course_Rating: courses[0].Course_Rating,
        Course_Instructor: instructor,
        // {
        //   Instructor_ID: instructor.Instructor_ID,
        //   Instructor_FirstName: instructor.Instructor_FirstName,
        //   Instructor_LastName: instructor.Instructor_LastName
        // },
        Course_Hours: courses[0].Course_Hours,
        Course_Country: courses[0].Course_Country,
        Course_Discount: courses[0].Course_Discount,
        Course_Discount_Duration: courses[0].Course_Discount_Duration,
        Course_Subtitle: subtitle,
        Course_Trainee: courses[0].Course_Trainee.length,
        Course_Review: courses[0].Course_Review,
        Course_Rate: courses[0].Course_Rate,
        Course_Exam: ExamObj
      };
      //console.log(Course.Course_ID);
      //console.log(courses[0].Course_Trainee.length);
      ArrayOfCourses.push(CourseT)

    }

    res.send(ArrayOfCourses)
  }
})

//Sprint 3


//Nour's enroll+pay first installment

//15 enter their credit card details to pay for a course they want to register for

router.post('/topUpWallet', async (req, res) => {
  var id = req.body.User_ID
  var amount = parseInt(req.body.amount)
  var wallet = 0;
  await (await user.find({ IndividualUser_ID: id })).map((user => {
    wallet = parseInt(user.individualUser_Wallet)
  }))
  amount = amount + wallet;
  await user.updateOne({ IndividualUser_ID: id }, { individualUser_Wallet: amount })
  res.send('done')
})
//16 pay for a course
router.post('/enrollAndPayCourse', async (req, res) => {
  var id = req.body.StudentTakeCourse_StudentID
  var coursePrice;
  var courseDiscount;
  var wallet = 0;
  var instructor;
  var instructorBalance;
  var date = new Date();

  if (!(await StudentTakeCourse.find({
    StudentTakeCourse_CourseID: req.body.StudentTakeCourse_CourseID,
    StudentTakeCourse_StudentID: id, StudentTakeCourse_Type: req.body.StudentTakeCourse_Type
  }))) {
    res.send("student already enrolled in this course")
  }
  else {
    await (await course.find({ Course_ID: req.body.StudentTakeCourse_CourseID })).map((co) => {
      coursePrice = co.Course_Price
      courseDiscount = co.Course_Discount
      instructor = co.Course_Instructor
    })
    await (await user.find({ IndividualUser_ID: id })).map((user => {
      wallet = parseInt(user.individualUser_Wallet)
    }))
    await (await Instructor.find({ Instructor_ID: instructor })).map((inst) => {
      if (inst.Instructor_Balance_Date.getMonth() != date.getMonth()) {
        inst.Instructor_Current_Balance = 0;
        instructorBalance = 0;
      }
      else {
        instructorBalance = inst.Instructor_Current_Balance
        date = inst.Instructor_Balance_Date;
      }

    })
    instructorBalance = instructorBalance + (coursePrice * 0.6)
    coursePrice = coursePrice - (coursePrice * courseDiscount / 100)
    wallet = wallet - coursePrice
    if (wallet < 0) {
      res.send("insufficient funds")
    }
    else {
      await user.updateOne({ IndividualUser_ID: id }, { individualUser_Wallet: wallet })
      courseRouter.createStudentTakeCourse(req, coursePrice)
      await Instructor.update({ Instructor_ID: instructor }, { Instructor_Current_Balance: instructorBalance, Instructor_Balance_Date: date })
      res.send("done")
    }

  }

})

// view wallet
router.post('/balance', async (req, res) => {
  var id = req.body.ID
  var balance;
  await (await user.find({ IndividualUser_ID: id })).map((user) => {
    balance = user.individualUser_Wallet
    res.json(balance);

  })
  // console.log(balance);
})

router.post('/getCoursePrice', async (req, res) => {
  var id = req.body.ID
  var price;
  await (await course.find({ Course_ID: id })).map((course) => {
    console.log(course.Course_Price)
    price = course.Course_Price - (course.Course_Price * course.Course_Discount / 100)
    res.json(price);
    console.log(price);

  })
  // console.log(balance);
})

// 14 view the most viewed/ most popular courses
router.get('/mostViewedCourses', async (req, res) => {
  var maxViews = 0;
  await (await course.find()).map((co) => {
    if (co.Course_Views >= maxViews) {
      maxViews = co.Course_Views
    }
  })

  //get courseIDs
  var ArrayOfCIDS = [];
  var count = 0;
  while (maxViews >= 0 && count < 4) {
    await (await course.find()).map((co) => {
      if (co.Course_Views == maxViews) {
        ArrayOfCIDS.push(co.Course_ID)
        count++;
      }
    })
    maxViews--;

  }
  console.log(ArrayOfCIDS)
  var ArrayOfCourses = [];

  for (let i = 0; i < ArrayOfCIDS.length; i++) {
    const courses = await course.find({ Course_ID: Number(ArrayOfCIDS[i]) }, '-_id');
    //console.log(courses);
    var { Course_Subtitle } = courses[0];
    var subtitle = []
    var videos = []
    for (let i = 0; i < Course_Subtitle.length; i++) {
      var tempVideo = [];
      subtitleTemp = await Subtitle.find({ Subtitle_ID: Course_Subtitle[i] }, '-_id');
      //console.log(subtitleTemp);
      var { Subtitle_Video } = subtitleTemp[0];

      for (let j = 0; j < Subtitle_Video.length; j++) {

        //console.log(Subtitle_Video[j]);
        var videosTemp = await Video.find({ Video_ID: Subtitle_Video[j] }, '-_id');
        const Videos = {
          Video_ID: videosTemp[0].Video_ID,
          Video_Link: videosTemp[0].Video_Link,
          Video_Subtitle: videosTemp[0].Video_Subtitle,
          Video_Description: videosTemp[0].Video_Description,
          Video_Length: videosTemp[0].Video_Length
        }
        tempVideo[j] = Videos;

      }
      videos[i] = tempVideo;
      const subtitleObj = {
        Subtitle_ID: subtitleTemp[0].Subtitle_ID,
        Subtitle_Name: subtitleTemp[0].Subtitle_Name,
        Subtitle_Course_ID: subtitleTemp[0].Subtitle_Name,
        Subtitle_Video: videos[i],
        Subtitle_Hours: subtitleTemp[0].Subtitle_Hours
      }

      // console.log(subtitleObj);
      subtitle[i] = subtitleObj;
    }
    // console.log(subtitle);
    var exams = courses[0].Course_Exam;
    var ExamObj = [];
    for (let i = 0; i < exams.length; i++) {
      const ExamTemp = await Exam.find({ Exam_ID: exams[i] }, '-_id');
      var QuestionObj = [];
      // console.log(ExamTemp);
      for (let j = 0; j < ExamTemp[0].Exam_Question_ID.length; j++) {
        var qq = await Question.find({ Question_ID: ExamTemp[0].Exam_Question_ID[j] }, '-_id');
        //console.log(qq)
        qq = qq[0];
        const tempQ = {
          Question_ID: qq.Question_ID,
          Question_Name: qq.Question_Name,
          Question_choices: qq.Question_choices,
          Question_Correct_Answers: qq.Question_Correct_Answers,
          Question_Grade: qq.Question_Grade,
        }

        QuestionObj[j] = tempQ;
      }
      const exam = {
        Exam_ID: exams[0].Exam_ID,
        Exam_Question_ID: QuestionObj,
        Exam_Grade: exams[0].Exam_Grade,
        Exam_Instructor_ID: exams[0].Exam_Instructor_ID,
        Exam_Course_ID: exams[0].Exam_Course_ID
      }
      ExamObj[i] = exam;
    }

    var instructor = await Instructor.findOne({ Instructor_ID: courses[0].Course_Instructor }).select('-_id -createdAt -updatedAt -__v')

    const CourseT = {
      Course_ID: courses[0].Course_ID,
      Course_Title: courses[0].Course_Title,
      Course_Subject: courses[0].Course_Subject,
      Course_Description: courses[0].Course_Description,
      Course_Price: courses[0].Course_Price,
      Course_Rating: courses[0].Course_Rating,
      Course_Instructor: instructor,

      Course_Hours: courses[0].Course_Hours,
      Course_Country: courses[0].Course_Country,
      Course_Discount: courses[0].Course_Discount,
      Course_Discount_Duration: courses[0].Course_Discount_Duration,
      Course_Subtitle: subtitle,
      Course_Trainee: courses[0].Course_Trainee.length,
      Course_Review: courses[0].Course_Review,
      Course_Rate: courses[0].Course_Rate,
      Course_Exam: ExamObj,
      Course_Views: courses[0].Course_Views
    };

    ArrayOfCourses.push(CourseT)
  }
  res.send(ArrayOfCourses)
})

//45 request a refund only if less than 50% of the course has been attended
router.post('/requestRefund', async (req, res) => {
  var id = req.body.ID;
  var courseID = req.body.courseID
  var refundable = false;
  var amount;
  if (await RefundRequest.find({ User_ID: id, Course_ID: courseID }).count().exec() == 0) {
    await (await StudentTakeCourse.find({ StudentTakeCourse_CourseID: courseID, StudentTakeCourse_StudentID: id, StudentTakeCourse_Type: 1 })).map((co) => {
      if (co.StudentTakeCourse_Progress < 50) {
        refundable = true;
        amount = co.StudentTakeCourse_Money_Paid / 2
      }
    })

    if (refundable) {
      await courseRouter.createRefundRequest(id, courseID, amount);
      res.send('Request successful')
    }
    else {
      res.send('More than 50% of course is completed, refund is not possible')
    }
  }
  else {
    res.send('Refund already requested')
  }

  /*if(refundable){
    await (await user.find({IndividualUser_ID:id})).map((user) => {
    wallet = user.individualUser_Wallet + amount
  })
    await user.updateOne({IndividualUser_ID:id},{individualUser_Wallet:wallet})
     StudentTakeCourse.deleteOne({StudentTakeCourse_CourseID:courseID,StudentTakeCourse_StudentID:id,StudentTakeCourse_Type:1})
   res.send("done")
  }
  else{
   res.send('More than 50% of course is completed, refund is not possible')
  }*/
})

//54 refund an amount to a trainee to their wallet
router.post('/refundWallet', async (req, res) => {
  var id = req.body.ID;
  var courseID = req.body.courseID
  var amount;
  console.log(id);
  console.log(courseID)
  await (await RefundRequest.find({ User_ID: id, Course_ID: courseID })).map((re) => {
    amount = re.Refund_Amount;
  })
  await (await user.find({ IndividualUser_ID: id })).map((user) => {
    amount += Number(user.individualUser_Wallet)
  })
  await RefundRequest.deleteOne({ User_ID: id, Course_ID: courseID })
  await user.updateOne({ IndividualUser_ID: id }, { individualUser_Wallet: amount })
  await StudentTakeCourse.deleteOne({ StudentTakeCourse_CourseID: courseID, StudentTakeCourse_StudentID: id, StudentTakeCourse_Type: 1 })
  res.send('done')
})

//47 report a problem with a course. The problem can be "technical", "financial" or "other"
router.post('/reportProblem', async (req, res) => {
  console.log(req.body);
  var id = await Problem.count().exec() + 1;
  var userId = req.body.ID
  var userType = req.body.User_Type
  var courseID = req.body.CourseID
  var courseTitle;
  var username;
  if (userType == 'Instructor') {
    userType = 3;
    await (await Instructor.find({ Instructor_ID: userId })).map((user) => {
      username = user.Instructor_username
    })
  }
  else if (userType == 'User') {
    userType = 1;
    await (await user.find({ IndividualUser_ID: userId })).map((user) => {
      username = user.individualUser_UserName
    })
  } else {
    userType = 2;
    await (await corp.find({ CorporateUser_ID: userId })).map((user) => {
      username = user.CorporateUser_UserName
    })

  }
  await (await course.find({ Course_ID: courseID })).map((course) => {
    courseTitle = course.Course_Title
  })

  courseRouter.createProblem(req.body, userType, username, courseTitle, id)
  res.send('Problem reported');

})

//48 see all previously repoted problems and their statuses
router.post('/viewMyProblems', async (req, res) => {
  var userId = req.body.ID;
  var userType = req.body.User_Type;
  var username;
  if (userType == 'Instructor') {
    userType = 3
    await (await Instructor.find({ Instructor_ID: userId })).map((user) => {
      username = user.Instructor_username
    })
  }
  else if (userType == 'User') {
    userType = 1
    await (await user.find({ IndividualUser_ID: userId })).map((user) => {
      username = user.individualUser_UserName
    })
  } else {
    userType = 2;
    await (await corp.find({ CorporateUser_ID: userId })).map((user) => {
      username = user.CorporateUser_UserName
    })
  }
  res.send(await Problem.find({ User_userName: username, User_Type: userType }));

})
router.get('/getCourseTitles', async (req, res) => {

  res.send(await course.find().select('Course_Title -_id'))
})
//50 request access to a specific course they do not have access to
router.post('/requestAccess', async (req, res) => {
  var userCompany;
  var courseTitle;
  console.log(req.body.Course_ID)
  await (await corp.find({ CorporateUser_ID: req.body.User_ID })).map((user) => {
    userCompany = user.CorporateUser_Corporate;
  })
  await (await course.find({ Course_ID: req.body.Course_ID })).map((co) => {
    courseTitle = co.Course_Title;
  })
  if (await StudentTakeCourse.find({ StudentTakeCourse_StudentID: req.body.User_ID, StudentTakeCourse_CourseID: req.body.Course_ID, StudentTakeCourse_Type: 2 }).count().exec() > 0) {
    res.json("Student already enrolled");
  }
  else {
    courseRouter.createRequest(req.body.User_ID, courseTitle, userCompany)
    res.json("Access Requested");

  }


})

router.post('/getCourseTitle', async (req, res) => {
  var courseTitle;
  await (await course.find({ Course_ID: req.body.Course_ID })).map((co) => {
    courseTitle = co.Course_Title;
  })
  res.json(courseTitle);
})

//52 view reported problems - should automaticalled be marked as "unseen"
router.get('/viewReportedProblems', async (req, res) => {
  console.log(await Problem.find());
  res.send(await Problem.find());
})

//53 mark reported problems as "resolved" or "pending"
router.put('/markProblem', async (req, res) => {
  await Problem.updateOne({ Problem_ID: req.body.Problem_ID }, { Problem_Status: req.body.Problem_Status })
  res.send('Problem marked');
})

//58 view course requests from corporate trainees
router.post('/courseRequests', async (req, res) => {

  res.send(await CorpRequest.find());
})
router.post('/refunds', async (req, res) => {

  res.send(await RefundRequest.find());
})

//59 grant corporate trainees access to specific courses
router.post('/grantAccess', async (req, res) => {
  var courseTitle = req.body.Course_ID
  var userId = req.body.userId
  var courseId;
  var coursePrice;
  var instructor;
  var instructorBalance;
  var date = new Date();

  await (await course.find({ Course_Title: courseTitle })).map((co) => {
    courseId = co.Course_ID;
    coursePrice = co.Course_Price;
    instructor = co.Course_Instructor;
  })
  await (await Instructor.find({ Instructor_ID: instructor })).map((inst) => {
    if (inst.Instructor_Balance_Date.getMonth() != date.getMonth()) {
      inst.Instructor_Current_Balance = 0;
      instructorBalance = 0;
    }
    else {
      instructorBalance = inst.Instructor_Current_Balance
      date = inst.Instructor_Balance_Date;
    }

  })
  instructorBalance = instructorBalance + (coursePrice * 0.6)
  await Instructor.update({ Instructor_ID: instructor }, { Instructor_Current_Balance: instructorBalance, Instructor_Balance_Date: date })
  await CorpRequest.remove({ User_ID: userId, Course_Title: courseTitle })
  await courseRouter.createCorpStudentTakeCourse(courseId, userId)
  await course.updateOne({ Course_ID: courseId }, {
    $push: {
      Course_Trainee: {
        $each: [userId],
        $position: 0
      }
    }
  })
  res.json('access granted')
})

router.put('/refuseAccess', async (req, res) => {
  var courseId = req.body.Course_ID
  var userId = req.body.userId
})


//60 set a promotion (% sale) for specific courses, several courses or all courses
router.post('/setSpecificPromotion', async (req, res) => {
  var courseId = req.body.Course_ID
  var discount = req.body.Course_Discount
  var duration = req.body.Course_Discount_Duration
  await course.updateOne({ Course_ID: courseId }, { Course_Discount: discount, Course_Discount_Duration: duration })
  res.send('promotion applied')

})

router.put('/setAllPromotions', async (req, res) => {
  var discount = req.body.Course_Discount
  var duration = req.body.Course_Discount_Duration

  await course.updateMany({ Course_Discount: discount, Course_Discount_Duration: duration })

  res.send('promotion applied')
})

router.put('/setGeneralPromotions', async (req, res) => {
  var discount = req.body.Course_Discount
  var duration = req.body.Course_Discount_Duration
  var courses = req.body.courses
  // var courses = ["Data Structures"]
  for (var i = 0; i < courses.length; i++) {
    await course.update({ Course_Title: courses[i] }, { Course_Discount: discount, Course_Discount_Duration: duration })
  }

  res.send('promotion applied')
})

router.post('/setFollowUp', async (req, res) => {
  var id = await Problem.count().exec() + 1;
  var userId = req.body.ID
  var userType = req.body.User_Type
  var courseTitle = req.body.courseTitle
  var followUPDesc = req.body.followUpDescription
  var username;
  console.log(courseTitle);
  if (userType == 'Instructor') {
    userType = 3;
    await (await Instructor.find({ Instructor_ID: userId })).map((user) => {
      username = user.Instructor_username
    })
  }
  else if (userType == 'User') {
    userType = 1;
    await (await user.find({ IndividualUser_ID: userId })).map((user) => {
      username = user.individualUser_UserName
    })
  } else {
    userType = 2;
    await (await corp.find({ CorporateUser_ID: userId })).map((user) => {
      username = user.CorporateUser_UserName
    })

  }

  await Problem.update({ User_userName: username, User_Type: userType, Course_Title: courseTitle }, { Problem_followUP: true, Follow_UP_Description: followUPDesc })
  console.log(await Problem.findOne({ User_userName: username, User_Type: userType, Course_Title: courseTitle }));
  res.send('Problem reported');

})

////////end sprint 3

//GET EXAM
router.post('/getExam', async (req, res) => {
  var ExamID = req.body.Exam_ID
  var CourseID = req.body.Course_ID
  var UserID = req.body.UserID
  var data = await Exam.findOne({ Exam_Course_ID: CourseID, Exam_ID: ExamID }).select('-_id -updatedAt -createdAt -__v');
  console.log(data)
  // console.log(data.Exam_Question_ID)
  var arrayOfQuestionIDS = data.Exam_Question_ID;
  var Questions = [];
  for (let i = 0; i < arrayOfQuestionIDS.length; i++) {
    Questions.push(await Question.findOne({ Question_ID: arrayOfQuestionIDS[i] }).select('-_id -updatedAt -createdAt -__v'))

  }
  var Exams = {
    "Exam_ID": 1,
    "Exam_Questions": Questions,
    "Exam_Grade": 10,
    "Exam_Instructor_ID": 3,
    "Exam_Course_ID": 5
  }
  res.send(Exams)
})


router.post('/checkAccess', async (req, res) => {

  var x = await CorpRequest.findOne({ User_ID: req.body.UserID, Course_Title: req.body.title }).select('User_ID -_id')
  console.log(req.body.UserID)
  console.log(req.body.title)
  // console.log(x)
  if (x == null) {
    res.json(1)//Not found
  }
  else {
    res.json(2) // Found
  }


})

router.post('/getviddescription', async (req, res) => {

  var x = await Video.findOne({ Video_ID: req.body.Video_ID }).select('Video_Description -_id')
  res.send(x.Video_Description)
})


module.exports = router;
