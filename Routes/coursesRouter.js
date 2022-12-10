const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const StudentTookexam = require('../Schemas/StudentTookexam.js');
const Video = require('../Schemas/Video.js');
const sub = require('../Schemas/Subtitle.js');
const Instructor = require('../Schemas/Instructor.js');
const Course = require('../Schemas/Course.js');
const Subtitle = require('../Schemas/Subtitle.js');
const Question = require('../Schemas/Question.js');
const Exam = require('../Schemas/Exam.js');



//to be changed later


// router.post('/createCourse', async (req,res)=>{
//     var id = await course.count().exec()+1;
//     courseRouter.createCourse(req,id)
//     res.send("Create a new course.")
// })
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

  router.get("/filterPrice", async (req, res) => {// for all but not for Corporate
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

router.get("/getAccess", async (req, res) => {
  var id_Course = req.body.Course_ID;
  var id_Trainee = req.body.User_ID;
  var course_array=await course.find({Course_ID:id_Course}).select('Course_Trainee -_id');
  var constant=null;
  var x = (JSON.stringify(course_array).split(":"));
  var z= x[1].split(" ");
  var y= z[0].split("]");
  var yy= y[0].split("[");
  var final = yy[1].split(',');
   for (let i =0;i<final.length;i++){
    if(Number(final[i])==(id_Trainee))
    constant=id_Course;
}
return(constant);
});

router.post("/RatingInstructor", async (req, res) => {
  await Instructor.updateOne(
    { Instructor_ID: req.body.ID },
    { 
      $push: { 
         Instructor_Ratings: {
            $each: [ req.body.Rating ],
            $position: 0
         }
       } 
     }).exec()
  res.status(200).send(Instructor.find({Instructor_ID: req.body.ID }).select('Instructor_Ratings -_id'));

});

router.post("/RatingCourse", async (req, res) => {
  await Course.updateOne(
    { Course_ID: req.body.ID },
    { 
      $push: { 
        Course_Rate: {
            $each: [ req.body.Rating ],
            $position: 0
         }
       } 
     }).exec()
     res.send(await Course.find({Course_ID: req.body.ID }).select('Course_Rate -_id').exec());

});

router.get("/getAccessToWatch", async (req, res) => {
  var id_Video = req.body.VID;
  var id_user=req.body.UserID;
  var constant=null;
  var video_subtitle=await Video.find({Video_ID:id_Video}).select('Video_Subtitle -_id');
  var x = (JSON.stringify(video_subtitle).split(":"));
  var z= x[1].split('"');
  var subtitle_course=await Subtitle.find({Subtitle_Name: z[1]}).select('Subtitle_Course_ID -_id');
  var xx = (JSON.stringify(subtitle_course).split(":"));
  var zz= xx[1].split('"');
  console.log(zz);
  var CID=zz[1];
  var course_array=await course.find({Course_ID:CID}).select('Course_Trainee -_id');
  var a = (JSON.stringify(course_array).split(":"));
  var b= a[1].split(" ");
  var c= b[0].split("]");
  var d= c[0].split("[");
  var final = d[1].split(',');
   for (let i =0;i<final.length;i++){
    if(Number(final[i])==(id_user))
    constant=await Video.find({Video_ID:id_Video}).select('Video_Link -_id');
}
res.send(constant)

});

router.post("/SubmitAnswers", async (req, res) => {
  var id_question = req.body.QID;
  var id_exam=req.body.EID;
  var id_user=req.body.UserID;
  var answer=req.body.answer;
  var exam_course=await Exam.find({Exam_ID:1}).select('Exam_Course_ID -_id');
  var x = (JSON.stringify(exam_course).split(":"));
  var z= x[1].split('"');
  var course_array=await course.find({Course_ID:z[1]}).select('Course_Trainee -_id');
  var constant=0;
  var x = (JSON.stringify(course_array).split(":"));
  var z= x[1].split(" ");
  var y= z[0].split("]");
  var yy= y[0].split("[");
  var final = yy[1].split(',');
   for (let i =0;i<final.length;i++){
    if(Number(final[i])==(id_user))
    constant=1;
}
//verified that trainee enrolled in course
  if(constant==1){
    var question_array=await Exam.find({Exam_ID: id_exam}).select('Exam_Question_ID -_id');
    var indexquestion=-1;
    var x = (JSON.stringify(question_array).split(":"));
    var z= x[1].split(" ");
    var y= z[0].split("]");
    var yy= y[0].split("[");
    var final = yy[1].split(',');
    var total=0;
     for (let i =0;i<final.length;i++){
      total++;
      if(Number(final[i])==(id_question))
      indexquestion=i;
  }
  if(indexquestion==-1){
    res.send("Wrong Question ID")
  }
  else{
    await StudentTookexam.updateOne(
      { StudentTookExam_Exam_ID: id_exam },
      { 
        $set: { 
          [`StudentTookExam_Answers.${indexquestion}`]:answer,
         } 
       }).exec()
       res.send("done");
  }
  }



});


router.post('/createStudentTakeExam', async (req,res)=>{
  var id = await StudentTookexam.count().exec()+1;

  courseRouter.createStudentTakeExam(req,id)
  var myexam = await (await Exam.find({Exam_ID:req.body.StudentTookExam_Exam_ID}).select('Exam_Question_ID -_id'))
  var indexquestion=0;
  var x = (JSON.stringify(myexam).split(":"));
  var z= x[1].split(" ");
  var y= z[0].split("]");
  var yy= y[0].split("[");
  var final = yy[1].split(',');
  var total=0;
   for (let i =0;i<final.length;i++){
    total++;
}
  for(let i=0;i<total;i++){
    await StudentTookexam.updateOne(
      { StudentTookExam_Exam_ID: req.body.StudentTookExam_Exam_ID },
      { 
        $push: { 
          StudentTookExam_Answers: {
              $each: [ null ],
           }
         } 
       }).exec()
  }
  
res.send("done")
})




router.post('/examGrades', async (req,res)=>{
var UserID = req.body.UserID;
var EID = req.body.EID;

var question_array=await Exam.find({Exam_ID: EID}).select('Exam_Question_ID -_id');
//console.log(question_array)
var x = (JSON.stringify(question_array).split(":"));
    var z= x[1].split(" ");
    var y= z[0].split("]");
    var yy= y[0].split("[");
    //ARray of Question IDS
    var FinalQuestionArray = yy[1].split(',');
 // console.log(FinalQuestionArray)
var StudentAns= await StudentTookexam.find({StudentTookExam_Exam_ID: EID,StudentTookExam_Student_ID:UserID}).select('StudentTookExam_Answers -_id');
var x = (JSON.stringify(StudentAns).split(":"));
    var z= x[1].split(" ");
    var y= z[0].split("]");
    var yy= y[0].split("[");
    var FinalStudenAnswer = yy[1].split(',');
// console.log(FinalStudenAnswer)
var StudentAnswersArray = new Array(FinalStudenAnswer.length).fill(0)
for (let i =0;i<FinalStudenAnswer.length;i++){
  StudentAnswersArray[i]=FinalStudenAnswer[i]
}


var TotalGrade = Number(0);
var grade =Number(0);
for(let i =0;i<FinalQuestionArray.length;i++){
var ModelAnswerArray= await Question.find({Question_ID:Number(FinalQuestionArray[i])}).select('Question_Correct_Answers -_id')
var x = (JSON.stringify(ModelAnswerArray).split(":"));
var z= x[1].split("'");
//THIS IS ANSWERS EL CORRECT
var CorrectAnswer = z[0].split('"')
//THIS IS ANSWERS EL STUDENT
var Answeri=StudentAnswersArray[i].split('"');
var Question_Grade= await Question.find({Question_ID:Number(FinalQuestionArray[i])}).select('Question_Grade -_id');
var x = (JSON.stringify(Question_Grade).split(":"));
var y = x[1].split("}")
TotalGrade+=Number(y[0])
//Check if correctAnswer
if(Answeri[1]==CorrectAnswer[1]){
var Question_Grade= await Question.find({Question_ID:Number(FinalQuestionArray[i])}).select('Question_Grade -_id');
var x = (JSON.stringify(Question_Grade).split(":"));
var y = x[1].split("}")
grade+=Number(y[0])
}
}
var Final = (grade/TotalGrade)*100;
await StudentTookexam.updateOne({StudentTookExam_Exam_ID: EID,StudentTookExam_Student_ID:UserID},{StudentTookExam_Grades:Final})
res.send("Done")
})
module.exports=router;