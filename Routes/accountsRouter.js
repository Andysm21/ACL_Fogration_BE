const signRouter = require('../Controller/accounts.js');
const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const inst = require('../Schemas/Instructor.js');
const Admin = require('../Schemas/Administrator.js');
const course = require('../Schemas/Course.js');''
const Subtitle = require('../Schemas/Subtitle.js');
const Video = require('../Schemas/Video.js');
const Question = require('../Schemas/Question.js');
const corp = require('../Schemas/CorporateUser.js');
const Exam = require('../Schemas/Exam.js');
const StudentTakeCourse = require('../Schemas/StudentTakeCourse');
const sendCertificate = require("../utils/sendCertificate");
const PDFDocument = require('pdfkit');
const fs =require('fs');
const express= require("express");
const { boolean } = require('joi');
const StudentTookexam = require('../Schemas/StudentTookexam.js');
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());


//Sprint 1

//select their country (6)
//TO be changed later because this is a guest and i guess we will use cookies for that/////
router.post('/changeCountryG', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await user.findOneAndUpdate({IndividualUser_ID:userid},{IndividualUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })
///////////////////////////////////////////////////////////////////////////////////////////
  router.post('/changeCountryI', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await inst.findOneAndUpdate({Instructor_ID:userid},{Instructor_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })
  router.post('/changeCountryCU', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await corp.findOneAndUpdate({CorporateUser_ID:userid},{CorporateUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })
  router.post('/changeCountryIU', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await user.findOneAndUpdate({IndividualUser_ID:userid},{IndividualUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })


// 55 add another administrator with a set username and password
router.post('/createAdmin', async (req,res)=>{
        var id = await Admin.count().exec()+1;

    if(req.body.Admin_Username=="")
        res.send("1")
    else if(req.body.Admin_Password=="")
        res.send("2")
    else if(await (await Admin.find({Admin_Username: req.body.Admin_Username}).select('Admin_Username')).length > 0)
        res.send("3")
    else{
        signRouter.createAdmin(req,id)
        res.send("4")
    }
})

//56 add instructors and create their usernames and passwords
router.post('/createInstructor',async (req,res)=>{
    var id = await inst.count().exec()+1;

    if(req.body.Instructor_username=="") //Username field should not be empty
        res.send("1")
    else if(req.body.Instructor_Password=="") //Password field should not be empty
        res.send("2")
    else if(await (await inst.find({Instructor_username: req.body.Instructor_username}).select('Instructor_username')).length > 0)
        {
          res.send("3")
        }
        //Choose another username.
    else if(await (await Admin.find({Admin_Username: req.body.Instructor_username}).select('Admin_Username')).length > 0){
      res.send("3")
       }
   else if(await (await corp.find({CorporateUser_UserName: req.body.Instructor_username}).select('CorporateUser_UserName')).length > 0){
          res.send("3")
        }
      else
          if(await (await user.find({individualUser_UserName: req.body.Instructor_username}).select('individual_Username')).length > 0)
        {
        res.send("3")
      }       
    else{
        signRouter.createInstructor(req,id)
        //Create a new Instructor.
        res.send("4")
    }
})

//57 add corporate trainees and create their usernames and passwords
router.post('/createCorporateUser', async (req,res)=>{
    var id = await corp.count().exec()+1;

    if(req.body.CorporateUser_UserName=="")
        res.send("1")
    else if(req.body.CorporateUser_Password=="")
        res.send("2")
        else if(await (await inst.find({Instructor_username: req.body.CorporateUser_UserName}).select('Instructor_username')).length > 0)
        {
          res.send("3")
        }
        //Choose another username.
    else if(await (await Admin.find({Admin_Username: req.body.CorporateUser_UserName}).select('Admin_Username')).length > 0){
      res.send("3")
       }
   else if(await (await corp.find({CorporateUser_UserName: req.body.CorporateUser_UserName}).select('CorporateUser_UserName')).length > 0){
          res.send("3")
        }
      else
          if(await (await user.find({individualUser_UserName: req.body.CorporateUser_UserName}).select('individual_Username')).length > 0)
        {
        res.send("3")
      }
        else{
        signRouter.createCorporateUser(req,id)
        res.send("4")
    
    }
    
})

//23 create a new course and fill in all its details 
//inclding title, subtitles, price and short summary about the entire course
router.post('/createCourse', async (req,res)=>{
    var id = await course.count().exec()+1;
    if(await (await (course.find({Course_Title: req.body.Course_Title}).select('Course_Title '))).length>0)
        res.send("Course already exists.");
    else if((req.body.Course_Title!= null && req.body.Course_Title!= "") && (req.body.Course_Price != null && req.body.Course_Price != "") && 
      (req.body.Course_Description != null && req.body.Course_Description != "") && (req.body.Course_Subject != null && req.body.Course_Subject != "") && 
      (req.body.Course_Country != null && req.body.Course_Country != "") && (req.body.Course_Instructor != null && req.body.Course_Instructor != "") && 
      (req.body.Course_Video_Preview != null && req.body.Course_Video_Preview != "")) {

      courseRouter.createCourse(req,id)
      //console.log("I am Here");
      res.send(id + "");
      }
    else{
        res.send("Please fill all required fields")
        }
       
})

// 3 sign up for an account as an individual trainee using
// a username, email, password, first name, last name and gender
router.post('/signUp', async (req,res)=>{
    var id = await user.count().exec()+1;
    // console.log(req.body)  
    var sign =1;
    if(await (await (user.find({individualUser_Email: req.body.individualUser_Email}).select('individualUser_Email'))).length > 0){
      console.log("1")
      sign=0;
        res.send("1")
      }
    else if(await (await user.find({individualUser_UserName: req.body.individualUser_UserName}).select('individualUser_UserName')).length > 0){
      console.log("2")
      sign=0;
        res.send("2")
      }
     else if(await (await corp.find({CorporateUser_UserName: req.body.individualUser_UserName}).select('CorporateUser_UserName')).length > 0){
      console.log("3")
      sign=0;

                res.send("3")
}
      else if((await inst.find({Instructor_username: req.body.individualUser_UserName}).select('Instructor_username')).length>0)
                {
                  sign=0;
                  console.log("3")
                  res.send("3")
                }
                //Choose another username.
            else if(await (await Admin.find({Admin_Username: req.body.individualUser_UserName}).select('Admin_Username')).length > 0){
              console.log("3")
              res.send("3")
               }
           else if(await (await corp.find({CorporateUser_UserName: req.body.individualUser_UserName}).select('CorporateUser_UserName')).length > 0){
            console.log("3")
                  res.send("3")
                }
              else
                  if(await (await user.find({individualUser_UserName: req.body.individualUser_UserName}).select('individual_Username')).length > 0)
                {
                  console.log("3")
                res.send("3")
              }
    else if(req.body.individualUser_UserName == "" || req.body.individualUser_Password == "" || req.body.individualUser_Email == "" || req.body.individualUser_FirstName == "" || req.body.individualUser_LastName == "" || req.body.individualUser_Gender == "" || req.body.individualUser_Country == "") {
      console.log("5")
      res.send("5")
    }
    else {
         signRouter.signUP(req,id)
         console.log("4")
        res.send("4")
    }


})
//same login page or not ?? I SAY NOT ~Andrew
router.post('/login', async (req,res)=>{
    var username = req.body.Uname;
    var password = req.body.Pass;
    //adming

        if(await (await (Admin.find({Admin_Username: username, Admin_Password: password}).select('Admin_ID -_id'))).length>0){
            var test = await Admin.findOne({Admin_Username: username, Admin_Password: password}).select('Admin_ID -_id');
            test = JSON.stringify(test)
            test = test.split(":")
             test = test[1].split('}')
            console.log(test[0])
            res.send("1"+":"+test[0])
        console.log("Admin Login")
    }
    else{
        if(await (await (inst.find({Instructor_username: username, Instructor_Password: password}).select('Instructor_ID -_id'))).length>0){// Instructor
            var test =await (inst.findOne({Instructor_username: username, Instructor_Password: password}).select('Instructor_ID -_id'));
            test = JSON.stringify(test)
            test = test.split(":")
            test = test[1].split('}')
            console.log(test[0])
            res.send("2"+":"+test[0])
            console.log("Inst Login")

        }
        else {
            if(await (await (user.find({individualUser_UserName: username, individualUser_Password: password}).select('IndividualUser_ID -_id'))).length>0){ // Trainees
                var test =await user.findOne({individualUser_UserName: username, individualUser_Password: password}).select('IndividualUser_ID -_id')
                test = JSON.stringify(test)
                console.log(test)
                test = test.split(":")
                test = test[1].split('}')
                console.log(test[0])
                res.send("3"+":"+test[0])
                console.log("Ind Login")

        }
        else{
            if(await (await (corp.find({CorporateUser_UserName: username, CorporateUser_Password: password}).select("CorporateUser_ID -_id"))).length>0){
                var test =await corp.findOne({CorporateUser_UserName: username, CorporateUser_Password: password}).select('CorporateUser_ID -_id')
                test = JSON.stringify(test)
                test = test.split(":")
                test = test[1].split('}')
                console.log(test[0])
                res.send("4"+":"+test[0])
                console.log("Corp Login")

            }
            else{
                res.send("5")
                console.log("Wrong Login")
            }

    }
}
  }
})

// STOPPED HERE Trying TO GET COURSES FOR THIS Student
router.post("/corporateProfile", async (req,res)=>{
    var User_ID= req.body.User_ID
    var data = await corp.findOne({CorporateUser_ID:User_ID}).select('CorporateUser_ID CorporateUser_UserName CorporateUser_Password CorporateUser_Email CorporateUser_FirstName CorporateUser_LastName CorporateUser_Gender CorporateUser_Country CorporateUser_Corporate CorporateUser_isCorporate -_id');
    data = JSON.stringify(data)
    data = data.split("{")
    data = data[1].split("}")
    data = data[0].split(",")
    // console.log(data)

    //ID
    var id=data[0].split(":")
    id= Number(id[1])
    //UserName
    var Uname=data[1].split(":")
    Uname= Uname[1].split('"')
    Uname=Uname[1]
    //Passowrd
    var Pass=data[2].split(":")
    Pass= Pass[1].split('"')
    Pass=Pass[1]
    //isCorporate
    var isCorporate=data[3].split(":")
    isCorporate= isCorporate[1].split('"')
    isCorporate=isCorporate[0]
    //FirstName
    var FName=data[4].split(":")
    FName= FName[1].split('"')
    FName=FName[1]
    //LastName
    var LName=data[5].split(":")
    LName= LName[1].split('"')
    LName=LName[1]
    //Email
    var Email=data[6].split(":")
    Email= Email[1].split('"')
    Email=Email[1]
    //Gender
    var Gender=data[7].split(":")
    Gender= Gender[1].split('"')
    Gender=Gender[1]
    //COuntry
    var Country=data[8].split(":")
    Country= Country[1].split('"')
    Country=Country[1]

    //Corporate
    var Corp=data[9].split(":")
    Corp= Corp[1].split('"')
    Corp=Corp[1]
 


var courses = await StudentTakeCourse.find({StudentTakeCourse_StudentID:id , StudentTakeCourse_Type: 2}).select('StudentTakeCourse_CourseID -_id').exec()
var CourseIDS=[];
courses = JSON.stringify(courses).split(',')
 for (let i = 0; i < courses.length; i++){
    var x = courses[i].split(":")
    x=x[1].split("}")
    CourseIDS.push(Number(x[0]))
 }
var ArrayofCourses=[]
//SALMA'S CODE TO GET everything about the course
  // var test =ID.split(":")
  // console.log(test)
  for(let i =0;i<CourseIDS.length;i++){
  const courses = await course.find({Course_ID: CourseIDS[i]},'-_id');
  //console.log(courses);
  var {Course_Subtitle} = courses[0];
  var subtitle = []
  var videos = []
  for(let i = 0; i < Course_Subtitle.length; i++)
  {
    var tempVideo = [];
    subtitleTemp = await Subtitle.find({Subtitle_ID: Course_Subtitle[i]},'-_id');
    //console.log(subtitleTemp);
    var {Subtitle_Video} = subtitleTemp[0];
    
    for(let j = 0; j < Subtitle_Video.length; j++){
      
      //console.log(Subtitle_Video[j]);
      var videosTemp= await Video.find({Video_ID: Subtitle_Video[j]},'-_id');
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
  for(let i = 0; i < exams.length; i++){
    const ExamTemp = await Exam.find({Exam_ID: exams[i]},'-_id');
    var QuestionObj = [];
   // console.log(ExamTemp);
    for(let j = 0; j< ExamTemp[0].Exam_Question_ID.length; j++){
      var qq = await Question.find({Question_ID: ExamTemp[0].Exam_Question_ID[j]},'-_id');
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
  
  var instructor = await inst.findOne({Instructor_ID: courses[0].Course_Instructor}).select('-_id -createdAt -updatedAt -__v')
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

  ArrayofCourses.push(CourseT)
}
///////////////////
var person = {
  User_ID: id,
  User_UserName : Uname,
  User_FirstName: FName,
  User_LastName: LName,
  User_Email: Email,
  User_Password:Pass,
  User_Country: Country,
  User_Gender: Gender,
  User_Courses: ArrayofCourses,
  User_Corporate: Corp,
  User_isCorporate: isCorporate,
}
    //res.send(courses)
    //res.send(await corp.findOne({CorporateUser_ID:User_ID}).select('CorporateUser_ID CorporateUser_UserName CorporateUser_Password CorporateUser_Email CorporateUser_FirstName CorporateUser_LastName CorporateUser_Gender CorporateUser_Counrty CorporateUser_Corporate -_id'))
    res.send(person)
})


router.post("/individualProfile", async (req,res)=>{
    var User_ID= req.body.User_ID
    var data = await user.findOne({IndividualUser_ID:User_ID}).select('IndividualUser_ID individualUser_UserName individualUser_Password individualUser_Email individualUser_FirstName individualUser_LastName individualUser_Gender IndividualUser_Country  isCorporate individualUser_Wallet -_id');
    data = JSON.stringify(data).split(",")
    console.log(data)

    //ID
    var id=data[0].split(":")
    id= Number(id[1])
    //UserName
    var Uname=data[1].split(":")
    Uname= Uname[1].split('"')
    Uname=Uname[1]
    //Email
    var Email=data[2].split(":")
    Email= Email[1].split('"')
    Email=Email[1]
    //Passowrd
    var Pass=data[3].split(":")
    Pass= Pass[1].split('"')
    Pass=Pass[1]
    //FirstName
    var FName=data[4].split(":")
    FName= FName[1].split('"')
    FName=FName[1]
    //LastName
    var LName=data[5].split(":")
    LName= LName[1].split('"')
    LName=LName[1]

    //Gender
    var Gender=data[6].split(":")
    Gender= Gender[1].split('"')
    Gender=Gender[1]
    //COuntry
    var Country=data[7].split(":")
    Country= Country[1].split('"')
    Country=Country[1]
    //isCorporate
    var isCorporate=data[8].split(":")
    isCorporate= isCorporate[1].split('"')
    isCorporate=isCorporate[0]
    //wallet
    var wallet=data[9].split(":")
    wallet= wallet[1].split('"')
    wallet=wallet[0].split('}')
    wallet = Number(wallet[0])
 


var courses = await StudentTakeCourse.find({StudentTakeCourse_StudentID:id , StudentTakeCourse_Type: 1}).select('StudentTakeCourse_CourseID -_id').exec()
var CourseIDS=[];
courses = JSON.stringify(courses).split(',')

if(courses==['[]']){
for (let i = 0; i < courses.length; i++){
    var x = courses[i].split(":")
    x=x[1].split("}")
    CourseIDS.push(Number(x[0]))
 }
var ArrayofCourses=[]
//SALMA'S CODE TO GET everything about the course
  // var test =ID.split(":")
  // console.log(test)
  for(let i =0;i<CourseIDS.length;i++){
  const courses = await course.find({Course_ID: CourseIDS[i]},'-_id');
  //console.log(courses);
  var {Course_Subtitle} = courses[0];
  var subtitle = []
  var videos = []
  for(let i = 0; i < Course_Subtitle.length; i++)
  {
    var tempVideo = [];
    subtitleTemp = await Subtitle.find({Subtitle_ID: Course_Subtitle[i]},'-_id');
    //console.log(subtitleTemp);
    var {Subtitle_Video} = subtitleTemp[0];
    
    for(let j = 0; j < Subtitle_Video.length; j++){
      
      //console.log(Subtitle_Video[j]);
      var videosTemp= await Video.find({Video_ID: Subtitle_Video[j]},'-_id');
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
  for(let i = 0; i < exams.length; i++){
    const ExamTemp = await Exam.find({Exam_ID: exams[i]},'-_id');
    var QuestionObj = [];
   // console.log(ExamTemp);
    for(let j = 0; j< ExamTemp[0].Exam_Question_ID.length; j++){
      var qq = await Question.find({Question_ID: ExamTemp[0].Exam_Question_ID[j]},'-_id');
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
  
  var instructor = await inst.findOne({Instructor_ID: courses[0].Course_Instructor}).select('-_id -createdAt -updatedAt -__v')
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
  
  ArrayofCourses.push(CourseT)
}
}
else{
    ArrayofCourses=[]
}
///////////////////
var person = {
  User_ID: id,
  User_UserName : Uname,
  User_FirstName: FName,
  User_LastName: LName,
  User_Email: Email,
  User_Password:Pass,
  User_Country: Country,
  User_Gender: Gender,
  User_Courses: ArrayofCourses,
  User_Corporate: "",
  User_isCorporate: isCorporate,
  User_Wallet: wallet
}
    //res.send(courses)
    //res.send(await corp.findOne({CorporateUser_ID:User_ID}).select('CorporateUser_ID CorporateUser_UserName CorporateUser_Password CorporateUser_Email CorporateUser_FirstName CorporateUser_LastName CorporateUser_Gender CorporateUser_Counrty CorporateUser_Corporate -_id'))
    res.send(person)
})

//////////Sprint 3

//41 receive a certificate as a PDF after completing the course via email
router.post('/sendCertificate', async (req,res)=>{
  /*var email;
  var id = req.body.ID
  if(req.body.type==1){
    await (await user.find({IndividualUser_ID:id})).map((co) => {
      email=co.individualUser_Email})
  }
  else{
    await (await corp.find({CorporateUser_ID:id})).map((co) => {
      email=co.CorporateUser_Email})
  }
    await sendCertificate(email, "Congratulations!!", 'Certificate of completion');
    res.send('done')*/
    var y;
    var CourseID = req.body.courseId;
    var UserID = req.body.userid;
    var Type = req.body.Type;
    console.log(UserID)
    await (await (course.find({Course_ID:CourseID}))).map((co)=>{
      y = co.Course_Title+ " Certificate";
  })
    var email;
    if(req.body.Type==1){
      await (await user.find({IndividualUser_ID:UserID})).map((co) => {
        email=co.individualUser_Email})
    }
    else{
      await (await corp.find({CorporateUser_ID:UserID})).map((co) => {
        email=co.CorporateUser_Email})
    }
    console.log(email)
    await sendCertificate(email,y, "Congratulations on completing the course!!");
       
      
   // await StudentTakeCourse.remove({StudentTakeCourse_CourseID:CourseID,StudentTakeCourse_StudentID:UserID,StudentTakeCourse_Type:Type})
   /* var ExamIDS=[];
    await (await Exam.find({Exam_Course_ID:CourseID})).map((Ex)=>{
      ExamIDS.push(Ex.Exam_ID)
    })
    for(var i =0; i<ExamIDS.length;i++){
      await StudentTookexam.remove({StudentTookExam_Exam_ID:ExamIDS[i],StudentTookExam_Student_ID:UserID,StudentTookExam_Type:Type})
    }*/
    
  
      res.send('done')
  
})

//42 download the certificate as a PDF from the website
router.get('/downloadCertificate', async (req,res)=>{
  
    res.download('../Uploads/Certificate.pdf')
  
})

//44 download the notes as a PDF
router.post('/downloadNotes', async (req,res)=>{
  const doc = new PDFDocument;
  doc.pipe(fs.createWriteStream('../Uploads/Notes.pdf'));
  doc.fontSize(18).text(req.body.notes, 100, 100);

  doc.end();
  res.download('../Uploads/Notes.pdf')

})

//51 view the amount available in their wallet from refunded courses
router.get('/viewWallet', async (req,res)=>{
  var id  = req.body.ID
  res.send(await user.find({IndividualUser_ID:id},'individualUser_Wallet -_id'))
})

//54 refund an amount to a trainee to their wallet
router.get('/refundWallet', async (req,res)=>{
  var id  = req.body.ID
  var amount = Number(req.body.amount)
  await (await user.find({IndividualUser_ID:id})).map((user) => {
    amount +=Number(user.individualUser_Wallet)
  })
  await user.update({IndividualUser_ID:id},{individualUser_Wallet:amount})
  res.send('done')
})



////////////end Sprint 3


//Andrew Adding Features for Global View////
router.post('/NameInd', async (req,res)=>{
  var id = req.body.UserID;
  var x =await user.findOne({IndividualUser_ID:id}).select('individualUser_FirstName -_id')
  res.send(x.individualUser_FirstName);
})
router.post('/NameCorp', async (req,res)=>{
  var id = req.body.UserID;
  var x =await corp.findOne({CorporateUser_ID:id}).select('CorporateUser_FirstName -_id')
  res.send(x.CorporateUser_FirstName);
})
router.post('/NameInst', async (req,res)=>{
  var id = req.body.UserID;
  var x =await inst.findOne({Instructor_ID:id}).select('Instructor_FirstName -_id')
  res.send(x.Instructor_FirstName);
})

module.exports=router;