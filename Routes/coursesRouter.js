const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
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

//10 filter the courses based on price (price can be FREE)
router.get("/filterPrice", async (req, res) => {// for all but not for Corporate
    const {Course_Price}= req.body
    console.log(await course.find({Course_Price:Course_Price},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send(await course.find({Course_Price:Course_Price},'Course_Title Course_Rating Course_Hours -_id'));
  });

//11 search for a course based on course title or subject or instructor
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

// 12 choose a course from the results and view (but not open) 
//its details including course subtitles, excercises , total hours of each subtitle, 
//total hours of the course 
//and price (including % discount if applicable) according to the country selected
router.get("/hoverOnCourse", async (req, res) => {
    const Course_Title = req.body.Course_Title;
    var data = await course.find({Course_Title:Course_Title}).select('Course_Subtitle Course_Exam Course_Hours Course_Price Course_Discount -_id')+"\n";
    var method = await courseRouter.getHoursAllSubtitles(Course_Title);
    data += method
    // console.log(data)
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
            $each: [ Number(req.body.Rating) ],
            $position: 0
         }
       } 
     }).exec()
  res.status(200).send(await Instructor.find({Instructor_ID: req.body.ID }).select('Instructor_Ratings -_id'));

});

router.post("/RatingCourse", async (req, res) => {
  await Course.updateOne(
    { Course_ID: req.body.ID },
    { 
      $push: { 
        Course_Rate: {
            $each: [ Number(req.body.Rating) ],
            $position: 0
         }
       } 
     }).exec()
     res.send(await Course.find({Course_ID: req.body.ID }).select('Course_Rate -_id').exec());

});

router.get("/getAccessToWatch", async (req, res) => {
  var id_Video = req.body.VID;
  var id_user=req.body.UserID;
  var Type = req.body.Type
  var subtitle = await Video.findOne({Video_ID:id_Video}).select('Video_Subtitle -_id');
  var Data=(JSON.stringify(subtitle).split(":"));
  var data2=Data[1].split("}");
  var finalbgd = data2[0].split('"')
  var CC = await Subtitle.findOne({Subtitle_Name:finalbgd[1]}).select("Subtitle_Course_ID -_id")
  var dataa = (JSON.stringify(CC).split(":"));
  console.log(CC)
  var ID=(dataa[1].split("}"))
  var CourseID=Number(ID[0]);
  
var verify = null;
verify=await StudentTakeCourse.find({StudentTakeCourse_CourseID:CourseID,StudentTakeCourse_StudentID:id_user,StudentTakeCourse_Type:Type})
var verify2= null;
var temp = (JSON.stringify(await Course.findOne({Course_ID:CourseID}).select('Course_Subtitle -_id')).split(":"))
console.log(temp)
var a = ((temp[1]).split(","));
console.log(a)
var array = []
var data =""
for (let i =0;i<a.length;i++){
    if(a[i]!="[" & a[i]!='"' & a[i]!="]")
    data+=a[i];
}
data = data.split(",")
data = data[0].split('"')
for (let i =0;i<data.length;i++){
  if(i%2!=0){
    array.push(data[i])
  }
}
for(let i =0;i<array.length;i++){
   if(finalbgd[1]==array[i]){
    verify2=1;
   }
}
if(verify=null)
{
res.send("Student not in course")
}
else{
  if(verify2==null){
    res.send("Subtitle doesnt belong to course")
  }
else{
  var constant=null;
  var video_subtitle=finalbgd[1]
  var x = (JSON.stringify(video_subtitle).split(":"));
  var z= x[0].split('"');
  var subtitle_course=CourseID;

  var course_array=await course.find({Course_ID:subtitle_course}).select('Course_Trainee -_id');
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

}}});
//PLEASE INSERT TYPE HERE
router.post("/SubmitAnswers", async (req, res) => {
  var id_question = req.body.QID;
  var id_exam=req.body.EID;
  var id_user=req.body.UserID;

  var answer=req.body.answer;
  var exam_course=await Exam.find({Exam_ID:EID}).select('Exam_Course_ID -_id');
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
  var CourseID=await Exam.find({Exam_ID: EID}).select('Exam_Course_ID -_id');
  await StudentTakeCourse.updateOne({StudentTakeCourse_CourseID:CourseID,StudentTakeCourse_StudentID:p1.body.StudentTookExam_Student_ID},
    {
       
      $push: { 
        StudentTakeCourse_StudentTakeExam: {
            id
         }
       }
    })

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

router.post('/enrollInCourse', async (req,res)=>{
  var id = await StudentTakeCourse.count().exec()+1;

  courseRouter.createStudentTakeCourse(req,id)

res.send("done")
})



router.post('/examGrades', async (req,res)=>{
var UserID =Number(req.body.UserID) ;
var EID = Number(req.body.EID);
var Type = Number(req.body.Type);

var CourseID= await Exam.find({Exam_ID: EID}).select('Exam_Course_ID -_id');
//JSON SPLITTING SHIT
var data = (JSON.stringify(CourseID).split(":"));
var ID=(data[1].split("}"))
var CourseID=Number(ID[0]);
console.log(ID)

var verify = null;
verify=await StudentTakeCourse.find({StudentTakeCourse_CourseID:CourseID,StudentTakeCourse_StudentID:UserID,StudentTakeCourse_Type:Type})
var verify2=null;
verify2= await StudentTookexam.find({StudentTookExam_Exam_ID:EID,StudentTookExam_Student_ID:UserID,StudentTookExam_Type:Type})
if(verify=null)
{
res.send("Student not in course")
}
else{
  if(verify2=null)
  {
    res.send("Student didnt take exam yet")
  }
  else{



var question_array=await Exam.find({Exam_ID: EID}).select('Exam_Question_ID -_id');
console.log(question_array)
var x = (JSON.stringify(question_array).split(":"));
    var z= x[1].split(" ");
    var y= z[0].split("]");
    var yy= y[0].split("[");
    //ARray of Question IDS
    var FinalQuestionArray = yy[1].split(',');
var StudentAns= await StudentTookexam.find({StudentTookExam_Exam_ID: EID,StudentTookExam_Student_ID:UserID}).select('StudentTookExam_Answers -_id');
var x = (JSON.stringify(StudentAns).split(":"));
    var z= x[1].split(" ");
    var y= z[0].split("]");
    var yy= y[0].split("[");
    var FinalStudenAnswer = yy[1].split(',');
var StudentAnswersArray = new Array(FinalStudenAnswer.length).fill(0)
for (let i =0;i<FinalStudenAnswer.length;i++){
  StudentAnswersArray[i]=FinalStudenAnswer[i]
}

var FinalStudentBEGAD=new Array(FinalStudenAnswer.length).fill(0);
var FinalModelBEGAD=new Array(FinalStudenAnswer.length).fill(0);

var TotalGrade = 0;
var grade =0;
for(let i =0;i<FinalQuestionArray.length;i++){
var ModelAnswerArray= await Question.find({Question_ID:FinalQuestionArray[i]}).select('Question_Correct_Answers -_id')
var x = (JSON.stringify(ModelAnswerArray).split(":"));
var z= x[1].split("'");
//THIS IS ANSWERS EL CORRECT
var CorrectAnswer = z[0].split('"')
//THIS IS ANSWERS EL STUDENT
 Answeri=StudentAnswersArray[i].split('"');
var Question_Grade= await Question.find({Question_ID:FinalQuestionArray[i]}).select('Question_Grade -_id');
var x = (JSON.stringify(Question_Grade).split(":"));
var y = x[1].split("}")
TotalGrade+=Number(y[0])
//Check if correctAnswer
FinalStudentBEGAD[i]=Answeri[1]
FinalModelBEGAD[i]=CorrectAnswer[1]

if(Answeri[1]==CorrectAnswer[1]){
var Question_Grade= await Question.find({Question_ID:Number(FinalQuestionArray[i])}).select('Question_Grade -_id');
var x = (JSON.stringify(Question_Grade).split(":"));
var y = x[1].split("}")
grade+=y[0]
}
}
var Final = (grade/TotalGrade)*100;
await StudentTookexam.updateOne({StudentTookExam_Exam_ID: EID,StudentTookExam_Student_ID:UserID},{StudentTookExam_Grades:Final})



res.send({Model:FinalModelBEGAD,Student:FinalStudentBEGAD,Grade:Final})
}
}
})



module.exports=router;