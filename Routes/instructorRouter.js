var bodyParser = require('body-parser');
const mongoDb = require('mongoose');
const express= require("express");
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const instructor = require('../Schemas/Instructor.js');
const corporateUser = require('../Schemas/CorporateUser.js');
const individualUser = require('../Schemas/IndividualUser.js');
const instructorRouter = require('../Controller/instructor.js');
const sendEmail = require("../utils/sendEmail");
const Question = require('../Schemas/Question.js');
const Exam = require('../Schemas/Exam.js');
const exams = require('../Controller/exams.js')
const courseCC = require('../Controller/courses.js');
const Video = require('../Schemas/Video.js');
const subtitle = require('../Schemas/Subtitle.js');
const Instructor = require('../Schemas/Instructor.js');
//const youtubekey='1081702991015-3ube06jg6k96mf2ckvcp850lv7iibq48.apps.googleusercontent.com'
const courseRouter = require('../Controller/courses.js');
const Admin = require('../Schemas/Administrator.js');


router.post("/RatingInstructor", async (req, res) => {
  await Instructor.updateOne(
    { Instructor_ID: req.body.ID},
    { 
      $push: { 
        Course_Rate: {
            $each: [ Number(req.body.Rating) ],
            $position: 0
         }
       } 
     }).exec()
     res.send(await instructor.find({Instructor_ID: req.body.ID }).select('Instructor_Ratings -_id').exec());

});

//18 view all the titles of the courses given by him/her
//DONEEEEEEEEEEEEEEEEEEEEEEEEE
router.post('/viewMyCoursesInstructor', async (req,res)=>{
  const x = req.body.Instructor_ID
  var data= await course.find({Course_Instructor: x}).select('Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee Course_ID Course_Discount_Duration Course_Discount -_id')
  
  var final= []
   for(let i =0;i<data.length;i++)
   {
     var test1= JSON.stringify(data[i])

       var arrayException=test1.split("[")
       var DataAlone=test1.split(",")
       var data1;
    // console.log(DataAlone)
   //Now Doing Trainees
   var CTT= arrayException[1].split(']')
   CTT=CTT[0].split(",")
   CTT= Number(CTT.length)
   //Now Doing CourseTitle
       var CT= DataAlone[1].split(':"')
       CT=CT[1].split('"')
       CT=CT[0]
   //Now Doing Country
       var CC= DataAlone[6].split(':"')
       CC=CC[1].split('"')
       CC=CC[0]
   //Course Instructor ID and Name JSON FILE
       test1=test1.split('"Course_Instructor":');
       test1=test1[1].split(",");
       var InstId=Number(test1[0])
       var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
   //Now Doing Course_Price
   var CP= DataAlone[2].split(':')
   CP=CP[1].split("'")
   CP=CP[0]
   //Now DOing Course_Rating
   var CR= DataAlone[3].split(':')
   CR=CR[1].split("'")
   CR=CR[0]
   //Now DOing Course_Hours
   var CH= DataAlone[5].split(':')
   CH=CH[1].split("'")
   CH=CH[0]
      //Now DOing Course ID
      var CID= DataAlone[0].split(':')
      CID=CID[1].split("'")
      CID=CID[0]
    //Now Discount
    var CD= DataAlone[7].split(':')
    CD=CD[1].split("'")
    CD=CD[0]
    //Now Discount duration
    var CDD= DataAlone[8].split(':')
    CDD=CDD[1].split("'")
    CDD=CDD[0]
    data1 = {
         "Course_ID": CID,
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
   //console.log(final)
   res.send(final);

});
//not yet front
//20 search for a course given by him/her based on course title or subject or instructor
router.get("/SearchCourseTitleInst", async (req, res) => {
  const Instructor_id = req.body.Instructor_ID
  const Course_Title= req.body.Course_Title
  // console.log(Course_Title.length)
  if(Course_Title.length == Number(0) ){
      var data = await course.find({Instructor_ID:Instructor_id }).select('Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id');

      var final= []
      for(let i =0;i<data.length;i++)
      {
        var test1= JSON.stringify(data[i])
 
          var arrayException=test1.split("[")
          var DataAlone=test1.split(",")
          var data1;
 
      //Now Doing Trainees
      var CTT= arrayException[1].split(',')
      CTT= Number(CTT.length)
      //Now Doing CourseTitle
          var CT= DataAlone[0].split(':"')
          CT=CT[1].split('"')
          CT=CT[0]
      //Now Doing Country
      // console.log(DataAlone)
          var CC= DataAlone[5].split(':"')
          CC=CC[1].split('"')
          CC=CC[0]
      //Course Instructor ID and Name JSON FILE
          test1=test1.split('"Course_Instructor":');
          test1=test1[1].split(",");
          var InstId=Number(test1[0])
          var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
      //Now Doing CourseiPrice
      var CP= DataAlone[1].split(':')
      CP=CP[1].split("'")
      CP=CP[0]
      //Now DOing Course_Rating
      var CR= DataAlone[2].split(':')
      CR=CR[1].split("'")
      CR=CR[0]
      //Now DOing Course_Hours
      var CH= DataAlone[4].split(':')
      CH=CH[1].split("'")
      CH=CH[0]
  //Now Discount
  var CD= DataAlone[7].split(':')
  CD=CD[1].split("'")
  CD=CD[0]
  //Now Discount duration
  var CDD= DataAlone[8].split(':')
  CDD=CDD[1].split("'")
  CDD=CDD[0]
  CDD=CDD.split("[")
  CDD=CDD[1].split(']')
  CDD=CDD[0]
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
        final.push(data1)
      }
      res.status(200).send(final);
  }
  else if(await course.find({Course_Instructor: Instructor_id, Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id').length == 0)
  {  
      res.status(200).send([]);
  }   
  else{
    var data = await course.find({Course_Instructor: Instructor_id, Course_Title:Course_Title},'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id') 
    var final= []
    for(let i =0;i<data.length;i++)
    {
      var test1= JSON.stringify(data[i])

        var arrayException=test1.split("[")
        var DataAlone=test1.split(",")
        var data1;

    //Now Doing Trainees
    var CTT= arrayException[1].split(',')
    CTT= Number(CTT.length)
    //Now Doing CourseTitle
        var CT= DataAlone[0].split(':"')
        CT=CT[1].split('"')
        CT=CT[0]
    //Now Doing Country
    console.log(DataAlone)
        var CC= DataAlone[5].split(':"')
        CC=CC[1].split('"')
        CC=CC[0]
    //Course Instructor ID and Name JSON FILE
        test1=test1.split('"Course_Instructor":');
        test1=test1[1].split(",");
        var InstId=Number(test1[0])
        var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
    //Now Doing Course_Price
    var CP= DataAlone[1].split(':')
    CP=CP[1].split("'")
    CP=CP[0]
    //Now DOing Course_Rating
    var CR= DataAlone[2].split(':')
    CR=CR[1].split("'")
    CR=CR[0]
    //Now DOing Course_Hours
    var CH= DataAlone[4].split(':')
    CH=CH[1].split("'")
    CH=CH[0]
  //Now Discount
  var CD= DataAlone[7].split(':')
  CD=CD[1].split("'")
  CD=CD[0]
  //Now Discount duration
  var CDD= DataAlone[8].split(':')
  CDD=CDD[1].split("'")
  CDD=CDD[0]
  CDD=CDD.split("[")
  CDD=CDD[1].split(']')
  CDD=CDD[0]
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
      final.push(data1)
    }
    res.send(final);
  }
 });
 router.post("/searchmycourses", async(req,res) =>{
  const searched = req.body.searchR;
  const {id} = req.body;
  const title = await course.find({Course_Title:searched, Course_Instructor: id},'Course_ID -_id');
  const subject = await course.find({Course_Subject:searched, Course_Instructor: id},'Course_ID -_id');
  var final = [];

  console.log(title.length);
  console.log(subject.length);
  if(title.length != 0) {
    res.send(await courseRouter.SearchCourseTitle(searched));
  }
  else if (subject.length != 0){
    res.send(await courseRouter.SearchCourseSubject(searched));
  }
  else 
    res.send("");
  

});

router.post("/Search", async(req,res) =>{
  const searched = req.body.searchR;
  //const {id} = req.body.id;
  const title = await course.find({Course_Title:searched},'Course_ID -_id');
  const subject = await course.find({Course_Subject:searched},'Course_ID -_id');
  var final = [];
  const instructor = await Instructor.find({Instructor_FirstName:searched},'Instructor_ID -_id');

  ////console.log(title.length);
 // console.log(subject.length);
 // console.log(instructor.length);  
  if(title.length != 0) {
    console.log("In here")
    res.send(await courseRouter.SearchCourseTitle(searched));
     }
    else if (subject.length != 0){
    res.send(await courseRouter.SearchCourseSubject(searched));
    }
  else if (instructor.length != 0){
    const {Instructor_ID} = instructor[0]
   // console.log(Instructor_ID);
    res.send(await courseRouter.SearchCourseIntrsuctor(Instructor_ID));
    }
  else 
    res.send("");
  

});
//not yet front
router.get("/SearchCourseSubjectInst", async (req, res) => {
const Instructor_id = req.body.Instructor_ID
  const SearchSubject= req.body.Course_Subject
  if(SearchSubject.length==Number(0)){
    var data = await course.find({Instructor_ID:Instructor_id }).select('Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id');

      var final= []
      for(let i =0;i<data.length;i++)
      {
        var test1= JSON.stringify(data[i])
 
          var arrayException=test1.split("[")
          var DataAlone=test1.split(",")
          var data1;
 
      //Now Doing Trainees
      var CTT= arrayException[1].split(',')
      CTT= Number(CTT.length)
      //Now Doing CourseTitle
          var CT= DataAlone[0].split(':"')
          CT=CT[1].split('"')
          CT=CT[0]
      //Now Doing Country
      console.log(DataAlone)
          var CC= DataAlone[5].split(':"')
          CC=CC[1].split('"')
          CC=CC[0]
      //Course Instructor ID and Name JSON FILE
          test1=test1.split('"Course_Instructor":');
          test1=test1[1].split(",");
          var InstId=Number(test1[0])
          var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
      //Now Doing Course_Price
      var CP= DataAlone[1].split(':')
      CP=CP[1].split("'")
      CP=CP[0]
      //Now DOing Course_Rating
      var CR= DataAlone[2].split(':')
      CR=CR[1].split("'")
      CR=CR[0]
      //Now DOing Course_Hours
      var CH= DataAlone[4].split(':')
      CH=CH[1].split("'")
      CH=CH[0]
  //Now Discount
  var CD= DataAlone[7].split(':')
  CD=CD[1].split("'")
  CD=CD[0]
  //Now Discount duration
  var CDD= DataAlone[8].split(':')
  CDD=CDD[1].split("'")
  CDD=CDD[0]
  CDD=CDD.split("[")
  CDD=CDD[1].split(']')
  CDD=CDD[0]
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
        final.push(data1)
      }
      res.status(200).send(final);
  }
  else if(await course.find({Course_Instructor: Instructor_id, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours -_id').length == 0)
  {
          res.status(200).send("Subject Not Found");
      } 
  else{
      var data = await course.find({Course_Instructor: Instructor_id, Course_Subject:SearchSubject},'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id');

      var final= []
      for(let i =0;i<data.length;i++)
      {
        var test1= JSON.stringify(data[i])
 
          var arrayException=test1.split("[")
          var DataAlone=test1.split(",")
          var data1;
 
      //Now Doing Trainees
      var CTT= arrayException[1].split(',')
      CTT= Number(CTT.length)
      //Now Doing CourseTitle
          var CT= DataAlone[0].split(':"')
          CT=CT[1].split('"')
          CT=CT[0]
      //Now Doing Country
      console.log(DataAlone)
          var CC= DataAlone[5].split(':"')
          CC=CC[1].split('"')
          CC=CC[0]
      //Course Instructor ID and Name JSON FILE
          test1=test1.split('"Course_Instructor":');
          test1=test1[1].split(",");
          var InstId=Number(test1[0])
          var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
      //Now Doing Course_Price
      var CP= DataAlone[1].split(':')
      CP=CP[1].split("'")
      CP=CP[0]
      //Now DOing Course_Rating
      var CR= DataAlone[2].split(':')
      CR=CR[1].split("'")
      CR=CR[0]
      //Now DOing Course_Hours
      var CH= DataAlone[4].split(':')
      CH=CH[1].split("'")
      CH=CH[0]
  //Now Discount
  var CD= DataAlone[7].split(':')
  CD=CD[1].split("'")
  CD=CD[0]
  //Now Discount duration
  var CDD= DataAlone[8].split(':')
  CDD=CDD[1].split("'")
  CDD=CDD[0]
  CDD=CDD.split("[")
  CDD=CDD[1].split(']')
  CDD=CDD[0]
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
        final.push(data1)
      }
      res.status(200).send(final);
    }  
});


//DONEEE
//19 filter the courses given by him/her based on a subject or price
router.post("/filterPriceInst", async (req, res) => {
  const Instructor_id = req.body.Instructor_ID
  const FilterPriceLower= req.body.FilterPrice1
  const FilterPriceHigher= req.body.FilterPrice2
  var data= await course.find({Course_Instructor:Instructor_id},'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
  //console.log(data)
  var final= []
  for(let i =0;i<data.length;i++)
  {
    var test1= JSON.stringify(data[i])

      var arrayException=test1.split("[")
      var DataAlone=test1.split(",")
      var data1;

  //Now Doing Trainees
  var CTT= arrayException[1].split(',')
  CTT= Number(CTT.length)
  //Now Doing CourseTitle
      var CT= DataAlone[0].split(':"')
      CT=CT[1].split('"')
      CT=CT[0]
  //Now Doing Country
  //console.log(DataAlone)
      var CC= DataAlone[5].split(':"')
      CC=CC[1].split('"')
      CC=CC[0]
  //Course Instructor ID and Name JSON FILE
      test1=test1.split('"Course_Instructor":');
      test1=test1[1].split(",");
      var InstId=Number(test1[0])
      var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
  //Now Doing Course_Price
  var CP= DataAlone[1].split(':')
  CP=CP[1].split("'")
  CP=CP[0]
  //Now DOing Course_Rating
  var CR= DataAlone[2].split(':')
  CR=CR[1].split("'")
  CR=CR[0]
  //Now DOing Course_Hours
  var CH= DataAlone[4].split(':')
  CH=CH[1].split("'")
  CH=CH[0]
   //Now Discount
   var CD= DataAlone[6].split(':')
   CD=CD[1].split("'")
   CD=CD[0]
//    console.log(CD)
//    console.log(DataAlone)

   //Now Discount duration
   var CDD= DataAlone[7].split(':')
   CDD=CDD[1].split("'")
   CDD=CDD[0]
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

    if(Number(FilterPriceLower)<=Number(CP )){
      if(Number(CP)<=Number(FilterPriceHigher)){
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

//DONEEE
router.post("/filterSubjectInst", async (req, res) => {
  const x = req.body.Instructor_ID
  const {FilterSubject} = req.body
  var data=await course.find({Course_Instructor: x, Course_Subject:FilterSubject},'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
  
  var final= []
  for(let i =0;i<data.length;i++)
  {
    var test1= JSON.stringify(data[i])

      var arrayException=test1.split("[")
      var DataAlone=test1.split(",")
      var data1;

  //Now Doing Trainees
  var CTT= arrayException[1].split(',')
  CTT= Number(CTT.length)
  //Now Doing CourseTitle
      var CT= DataAlone[0].split(':"')
      CT=CT[1].split('"')
      CT=CT[0]
  //Now Doing Country
  console.log(DataAlone)
      var CC= DataAlone[5].split(':"')
      CC=CC[1].split('"')
      CC=CC[0]
  //Course Instructor ID and Name JSON FILE
      test1=test1.split('"Course_Instructor":');
      test1=test1[1].split(",");
      var InstId=Number(test1[0])
      var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
  //Now Doing Course_Price
  var CP= DataAlone[1].split(':')
  CP=CP[1].split("'")
  CP=CP[0]
  //Now DOing Course_Rating
  var CR= DataAlone[2].split(':')
  CR=CR[1].split("'")
  CR=CR[0]
  //Now DOing Course_Hours
  var CH= DataAlone[4].split(':')
  CH=CH[1].split("'")
  CH=CH[0]
   //Now Discount
   var CD= DataAlone[6].split(':')
   CD=CD[1].split("'")
   CD=CD[0]
//    console.log(CD)
//    console.log(DataAlone)

   //Now Discount duration
   var CDD= DataAlone[7].split(':')
   CDD=CDD[1].split("'")
   CDD=CDD[0]
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

//DONEEE
router.post("/filterPriceAndSubjectInst", async (req, res) => {
  const Instructor_id = req.body.Instructor_ID
  const FilterPriceLower= req.body.FilterPrice1
  const FilterPriceHigher= req.body.FilterPrice2
  const {FilterSubject} = req.body
  var data= await course.find({Course_Instructor:Instructor_id,Course_Subject:FilterSubject},'Course_Discount Course_Discount_Duration Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
  console.log(data)
  var final= []
  for(let i =0;i<data.length;i++)
  {
    var test1= JSON.stringify(data[i])

      var arrayException=test1.split("[")
      var DataAlone=test1.split(",")
      var data1;

  //Now Doing Trainees
  var CTT= arrayException[1].split(',')
  CTT= Number(CTT.length)
  //Now Doing CourseTitle
      var CT= DataAlone[0].split(':"')
      CT=CT[1].split('"')
      CT=CT[0]
  //Now Doing Country
  console.log(DataAlone)
      var CC= DataAlone[5].split(':"')
      CC=CC[1].split('"')
      CC=CC[0]
  //Course Instructor ID and Name JSON FILE
      test1=test1.split('"Course_Instructor":');
      test1=test1[1].split(",");
      var InstId=Number(test1[0])
      var X = await instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
  //Now Doing Course_Price
  var CP= DataAlone[1].split(':')
  CP=CP[1].split("'")
  CP=CP[0]
  //Now DOing Course_Rating
  var CR= DataAlone[2].split(':')
  CR=CR[1].split("'")
  CR=CR[0]
  //Now DOing Course_Hours
  var CH= DataAlone[4].split(':')
  CH=CH[1].split("'")
  CH=CH[0]
   //Now Discount
   var CD= DataAlone[6].split(':')
   CD=CD[1].split("'")
   CD=CD[0]
//    console.log(CD)
//    console.log(DataAlone)

   //Now Discount duration
   var CDD= DataAlone[7].split(':')
   CDD=CDD[1].split("'")
   CDD=CDD[0]
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

    if(Number(FilterPriceLower)<=Number(CP )){
      if(Number(CP)<=Number(FilterPriceHigher)){
        console.log(CP)
        console.log(FilterPriceLower)
        console.log(FilterPriceHigher)
        final.push(data1)
      }
    }
  }
  res.status(200).send(final);
});


router.post("/instructorProfile", async (req,res)=>{
  var Inst_ID= req.body.Instructor_ID
  var date = new Date();
  await (await Instructor.find({Instructor_ID:Inst_ID})).map(async (inst)=>{
    if(inst.Instructor_Balance_Date.getMonth()!=date.getMonth()){
      await Instructor.update({Instructor_ID:Inst_ID},{Instructor_Current_Balance:0,Instructor_Balance_Date:date})
    }
  })
  res.send(await Instructor.findOne({Instructor_ID:Inst_ID}).select('Instructor_ID Instructor_username Instructor_Password Instructor_Email Instructor_FirstName Instructor_LastName Instructor_Gender Instructor_Counrty Instructor_Biography Instructor_Ratings Instructor_Reviews Instructor_Current_Balance -_id'))
})


router.post("/instructorAccount", async (req,res)=>{
  var Inst_ID= req.body.Instructor_ID
  //console.log(Inst_ID);
  const instructor = await Instructor.find({Instructor_ID:Inst_ID}).select('Instructor_ID Instructor_username Instructor_Password Instructor_Email Instructor_FirstName Instructor_LastName Instructor_Gender Instructor_Country Instructor_Counrty Instructor_Biography Instructor_Ratings Instructor_Courses Instructor_Reviews  -_id')
  //console.log(instructor);
  var {Instructor_Courses} = instructor[0];
  var courses = []
  var rate = []
  for(let i = 0; i < Instructor_Courses.length; i++)
  {
    courseTemp = await course.find({Course_ID: Instructor_Courses[i]},'-_id');
    const courseObj = {
      Course_ID: courseTemp[0].Course_ID,
      Course_Title: courseTemp[0].Course_Title,
      Course_Description: courseTemp[0].Course_Description,
      Course_Rate: courseTemp[0].Course_Rate
    }
 
    courses[i] = courseObj;
    rate = [];
  }

  const instructorObj = {
    Instructor_ID: instructor[0].Instructor_ID,
    Instructor_username: instructor[0].Instructor_username,
    Instructor_Password: instructor[0].Instructor_Password,
    Instructor_Email: instructor[0].Instructor_Email,
    Instructor_FirstName: instructor[0].Instructor_FirstName,
    Instructor_LastName: instructor[0].Instructor_LastName,
    Instructor_Gender: instructor[0].Instructor_Gender,
    Instructor_Country: instructor[0].Instructor_Country,
    Instructor_Biography: instructor[0].Instructor_Biography,
    Instructor_Ratings: instructor[0].Instructor_Ratings, 
    Instructor_Courses: courses,
    Instructor_Reviews: instructor[0].Instructor_Reviews

  }
  var ArrayOfCourses=[];
  ArrayOfCourses.push(instructorObj)
  console.log(ArrayOfCourses);
  res.send(instructorObj);


})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//create a multiple choice exam with 4 choices per question
router.post("/createExam", async(req, res) => {
  var id = await Exam.count().exec()+1;
  exams.createExam(req,id);
  console.log(req.body.Course);
  await course.updateOne(
    { Course_ID: Number(req.body.Course) },
    { 
      $push: { 
        Course_Exam: {
            $each: [ id ],
            $position: 0
         }
       } 
     }).exec()

  console.log("Exam Created")
  res.send(id + "");
})

router.post("/createQuestion", async(req,res) => {
  var id = await Question.count().exec()+1;
  console.log(req.body);
  if(req.body.questionChoice1 == null || req.body.questionChoice1 == "" || 
  req.body.questionChoice2 == null || req.body.questionChoice2 == "" ||
  req.body.questionChoice3 == null || req.body.questionChoice3 == "" ||
  req.body.questionChoice4 == null || req.body.questionChoice4 == "" ||
  req.body.Question_Name == null || req.body.Question_Name == "" ||
  req.body.Question_Correct_Answer == null || req.body.Question_Correct_Answer == "")
  res.send("Please fill all required fields");
  else{
    
  var question_choices = [];
  question_choices[0] = req.body.questionChoice1;
  question_choices[1] = req.body.questionChoice2;
  question_choices[2] = req.body.questionChoice3;
  question_choices[3] = req.body.questionChoice4;
  exams.createQuestion(parseInt(id),req.body.Question_Name,question_choices,req.body.Question_Correct_Answer);
  console.log(Exam.findOne({ Exam_ID: req.body.exam_id }))
  await Exam.updateOne(
    { Exam_ID: req.body.exam_id },
    { 
      $push: { 
        Exam_Question_ID: {
            $each: [ id ],
            $position: 0
         }
       } ,
     }).exec()
     var x = await Exam.findOne({Exam_ID:Number(req.body.exam_id)}).select('Exam_Grade -_id')
     x=x.Exam_Grade+1;
     await Exam.updateOne(
      { Exam_ID:Number(req.body.exam_id)},{Exam_Grade:x}
       ).exec()
  console.log("hello")
    // var number = await Exam.findOne({ Exam_ID: req.body.exam_id }, 'Exam_Question_ID -_id')
    // var grade = number.length;
    // await Exam.updateOne({ Exam_ID: req.body.exam_id }, {Exam_Grade: grade});
     
    res.send("");
  }

})


router.post("/createExam1", async (req, res) =>{
  var Question_Choices = [] ;
  var Question_Name;
  var allQuestions = req.body.questions;
  var arrayofQuestions = (JSON.stringify(allQuestions).split('"'));
  var Test = [arrayofQuestions[1]]
  var arrayofQuestions= Test[0].split(",");
  var arrayQuestionID = [];
  var TotalGrade = 0;
  var j = 0;
  var Question_ID = await Question.count().exec()+1;
  if(arrayofQuestions[0] === '""'){
    res.send("Cannot Create an Exam without Questions!");
  }
  else if(arrayofQuestions.length%7 != 0){
    res.send("Question fields are not complete!");
  }
  else {
    for (let i=0;i<arrayofQuestions.length;i+=7){
    Question_Name = arrayofQuestions[i];
    Question_Choices[0] = arrayofQuestions[i+1] ;
    Question_Choices[1] = arrayofQuestions[i+2] ;
    Question_Choices[2] = arrayofQuestions[i+3] ;
    Question_Choices[3] = arrayofQuestions[i+4] ;
    Question_Correct_Answer = arrayofQuestions[i+5];
    Question_Grade = arrayofQuestions[i+6];
    TotalGrade += parseInt(arrayofQuestions[i+6]);
    arrayQuestionID[j++] = Question_ID;
   exams.createQuestion(parseInt(Question_ID),Question_Name,Question_Choices,Question_Correct_Answer,Question_Grade);
    Question_ID ++;
    }

    var id = await Exam.count().exec()+1;
    exams.createExam(req, arrayQuestionID,TotalGrade,id);
    res.send("Exam Created");
    course.updateOne({Course_ID:req.body.Course},{ 
      $push: { 
        Course_Exam: {
            $each: [ id ],
         }
       } 
     }).exec()
  }
 
})


//define a promotion for the course (% discount) and for how long
router.post("/course_promotion", async (req, res) =>{

  const {courseID} = req.body;
  const Discount = req.body.discount;
  const Duration = req.body.duration;
  console.log(Discount)
  console.log(Duration)
  console.log("HIII")
  if(Discount.length == 0){
    res.status(200).send("Discount value should not be empty!");
  }
  else if(Duration.length == 0){
    res.status(200).send("Discount duration should not be empty!");
  }
  else if(parseInt(Discount) > 100)
  res.status(200).send("Discount should not be greater than 100!");
  else{
    const users = await course.findOneAndUpdate({Course_ID: courseID}, {Course_Discount: Discount, Course_Discount_Duration:Duration},{new: true});
    res.status(200).send("Discount got applied");
  }
  
});

//view the ratings and reviews on all his/her courses (19)
router.get("/ViewRatingAndReviews", async (req, res) => {
  const x= req.body.Instructor_ID
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
  console.log(await course.find({Course_Instructor:x},'Course_Title Course_Rate Course_Review -_id'))
  res.status(200).send(await course.find({Course_Instructor:x},'Course_Title Course_Rate Course_Review -_id'));
  }
  else {
    res.status(404).send("User not found");
  }

});

//view his/her rating and reviews as an instructor(28)
router.get("/ViewMyRatingAndReviews", async (req, res) => {
  const x= req.body.Instructor_ID
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    res.status(200).send(await instructor.find({Instructor_ID:x},'Instructor_ID Instructor_Ratings Instructor_Reviews -_id') );
  }
  else {
    res.status(404).send("User not found");
  }
  
});

//edit his/her mini biography or email(29)
router.put("/editBiographyOrEmail", async (req, res) => {
  const bio= req.body.Instructor_Biography
  const email= req.body.Instructor_Email
  const x= req.body.Instructor_ID 
  if(email == "" && bio != ""){
    await instructor.update({Instructor_ID:x},{Instructor_Biography:bio})
    res.status(200).send("In fo updated");
  }
  else if(bio == "" && email != ""){
    await instructor.update({Instructor_ID:x},{Instructor_Email:email})
    res.status(200).send("Info updated");
  }
  else if(email == "" && bio == ""){
    res.status(200).send("No data to update");
  }
  else if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    await instructor.update({Instructor_ID:x},{Instructor_Email:email, Instructor_Biography:bio})
    res.status(200).send("Info updated");
  }
  else {
    res.status(404).send("User not found");
  }
});
//First and last names ,bio and country and gender
router.put("/editProfile", async (req, res) => {
 const id = req.body.Instructor_ID
 const bio= req.body.Instructor_Biography
 const email= req.body.Instructor_Email
 const username = req.body.Instructor_username
 const firstName = req.body.Instructor_FirstName
 const lastname = req.body.Instructor_LastName
 const gender = req.body.Instructor_Gender
 const country = req.body.Instructor_Country
 const checkUN = await instructor.findOne({Instructor_username:username},'Instructor_ID -_id');
 const checkEM = await instructor.findOne({Instructor_Email: email},'Instructor_ID -_id');
//console.log(req.body);
// console.log(checkEM);
//console.log(id);
// console.log(checkUN);
  if(username == '') //username cannot be empty
    res.send("1");
  else if(checkUN != null && checkUN.Instructor_ID != id){ //username already in use
    res.send("2");
  }
  else if(checkEM != null && checkEM.Instructor_ID != id){ //email already in use
    res.send("3");
  }
  else{
    const x = await instructor.updateOne({Instructor_ID: id},
      {Instructor_Biography:bio , Instructor_FirstName: firstName, Instructor_LastName: lastname, Instructor_Gender: gender, Instructor_Country: country})
      res.send("4")
  }
});


//Username and Email
router.put("/editProfileUserEmail", async (req, res) => {
  const id = req.body.Instructor_ID
  const email= req.body.Instructor_Email
  const username = req.body.Instructor_username
  const checkUN = await instructor.findOne({Instructor_username: username},'Instructor_ID -_id');
  const checkEM = await instructor.findOne({Instructor_Email: email},'Instructor_ID -_id');
   if(username == '') //username cannot be empty
     res.send("1");
   else if(checkUN != null && checkUN.Instructor_ID != id){ //username already in use
     res.send("2");
   }
   else if(checkEM != null && checkEM.Instructor_ID != id){ //email already in use
     res.send("3");
   }
   else{
    const x = await instructor.updateOne({Instructor_ID: id},{Instructor_username: username, Instructor_Email: email});
     res.send("4")
   }

 });
//change his/her password (31/32)
router.post("/changePassword", async (req, res) => {
  const pass= req.body.Password
  const x= req.body.ID  
  const type = req.body.type
  if(type == 1){
    if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
      await instructor.updateOne({Instructor_ID:x},{Instructor_Password:pass})
      res.status(200).send("Password updated");
    }
    else {
      res.status(409).send("User not found");
    }
  }
  if(type == 2){
    if((await individualUser.find({IndividualUser_ID:x},'IndividualUser_ID -_id')).length != 0){
      await individualUser.updateOne({IndividualUser_ID:x},{individualUser_Password:pass})
      res.status(200).send("Password updated");
    }
    else {
      res.status(409).send("User not found");
    }
  }
  if(type == 3){
    if((await corporateUser.find({CorporateUser_ID:x},'CorporateUser_ID -_id')).length != 0){
      await corporateUser.updateOne({CorporateUser_ID:x},{CorporateUser_Password:pass})
      res.status(200).send("Password updated");
    }
    else {
      res.status(409).send("User not found");
    }
  }
  console.log("hi")
  
});


//receive an email to change a forgotten password(32)
router.post("/forgotPassword", async (req, res) => {
	try {
		//const x= req.body.Instructor_ID  
    const email = req.body.Email
    if(!(await instructor.findOne({Instructor_Email:email}))){
      if(!(await individualUser.findOne({individualUser_Email:email}))){
        if(!(await corporateUser.findOne({CorporateUser_Email:email}))){
          return res
				.status(409)
				.send({ message: "User with given email does not exist!" });
    }
    else {
      const url = `http://localhost:3000/guest/corpPasswordReset/`;
      await sendEmail(email, "Password Reset", url);
    }
  }
    else{
      const url = `http://localhost:3000/guest/userPasswordReset/`;
      await sendEmail(email, "Password Reset", url);
    }

  }
    else{
    const url = `http://localhost:3000/guest/instructorPasswordReset/`;
		await sendEmail(email, "Password Reset", url);
    }

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


  //upload a video link from YouTube under each subtitle and enter a short description of the video
  //only remaining how to calculate its length
  router.post("/upload_video", async (req, res) =>{
    var id = await Video.count().exec()+1;
    Video.create({Video_ID: id, Video_Link: req.body.link, Video_Subtitle: req.body.subtitle, Video_Description: req.body.description, Video_Length: parseInt(req.body.length)});
    var hours= await subtitle.findOne({Subtitle_ID: parseInt(req.body.subtitle)}).select('Subtitle_Hours')
    hours=hours.Subtitle_Hours;
    subtitle.updateOne({Subtitle_ID: parseInt(req.body.subtitle)},{ 
      $push: { 
        Subtitle_Video: {
            $each: [ id ],
         }
       } 
     }).exec()
     subtitle.updateOne({Subtitle_ID: parseInt(req.body.subtitle)},{ 
      Subtitle_Hours:hours+req.body.length
        
     }).exec()

     res.send("Video Created");
  });


  router.post("/ytl", async (req, res) =>{
  })

  router.post("/InstContractStatus",async (req, res) =>{
    const {id} = req.body;
    const {Instructor_Agreement} = req.body;
   var x= await instructor.findOne({Instructor_ID:id}).select('Instructor_Agreement -_id').exec();
   console.log(x);
    res.send(x);
})
  router.put("/agreementContract",async (req, res) =>{
      const {id} = req.body;
      const {Instructor_Agreement} = req.body;
      await instructor.updateOne({Instructor_ID:id},{Instructor_Agreement:Instructor_Agreement});
      res.send("Done");
  })


  router.post("/getMoneyOwed", async(req,res)=>{
    var id = req.body.id
    var moneyOwed;
    var month;
    var today = new Date();
    var currMonth = today.getMonth()
    await (await instructor.find({Instructor_ID:id})).map((inst)=>{
      month =inst.Instructor_Balance_Date;
      if(currMonth==month.getMonth()){
        moneyOwed = inst.Instructor_Current_Balance
      }
      else{
        moneyOwed =0;
      }
    })
    res.send({Money:moneyOwed})
  })


  router.post("/changeForgetPassword", async (req, res) => {
    const pass= req.body.Password
    const username=req.body.username
    if(await (await instructor.find({Instructor_username: username}).select('Instructor_username')).length > 0)
    {
      await instructor.findOneAndUpdate({Instructor_username: username},{Instructor_Password: pass})
    }
    //Choose another username.
else if(await (await Admin.find({Admin_Username: username}).select('Admin_Username')).length > 0){
    await Admin.findOneAndUpdate({Admin_Username: username},{Admin_Password: pass})
   }
else if(await (await corporateUser.find({CorporateUser_UserName: username}).select('CorporateUser_UserName')).length > 0){
  await corporateUser.findOneAndUpdate({CorporateUser_UserName: username},{CorporateUser_Password: pass})
    }
  else if(await (await individualUser.find({individualUser_UserName: username}).select('individual_Username')).length > 0)
    {
      await individualUser.findOneAndUpdate({individualUser_UserName: username},{individualUser_Password: pass})
  }       
  else{
    res.send("wrong username");
    
    }


});
module.exports=router;
