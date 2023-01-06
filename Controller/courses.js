const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const course = require('../Schemas/Course.js');
const Video = require('../Schemas/Video.js');
const Subtitle = require('../Schemas/Subtitle.js');
const { response } = require("express");
const StudentTookexam = require('../Schemas/StudentTookexam.js');
const StudentTakeCourse= require('../Schemas/StudentTakeCourse.js');
const Problem= require('../Schemas/Problem.js');
const CorpRequest= require('../Schemas/CorpRequest.js');
const Instructor = require("../Schemas/Instructor.js");
const RefundRequest= require('../Schemas/RefundRequest.js');

function createSubtitle(p1,id){
Subtitle.create({
    Subtitle_ID:id,
    Subtitle_Name: p1.body.Subtitle,
    Subtitle_Course_ID: Number(p1.body.Subtitle_Course_ID),
    Subtitle_Video:[],
    Subtitle_Hours:0})
}


function createCourse(p1,id) {
    course.create({
        Course_ID:id,
        Course_Title:p1.body.Course_Title,
        Course_Subject:p1.body.Course_Subject,
        Course_Description:p1.body.Course_Description,
        Course_Price:p1.body.Course_Price,
        Course_Rating:5,
        Course_Instructor:p1.body.Course_Instructor,
        Course_Hours:0,
        Course_Country:p1.body.Course_Country,
        Course_Discount:0,
        Course_Discount_Duration:0,
        Course_Subtitle:[],
        Course_Trainee:[],
        Course_Review:[],
        Course_Rate:5,
        Course_Exam:[],
        Course_Video_Preview:p1.body.Course_Video_Preview, 
        Course_Views:0})
}

function createVideo(p1,id){
    Video.create({
        Video_ID:id,
        Video_Link:p1.body.link,
        Video_Subtitle: Number(p1.body.subtitle),
        Video_Description:p1.body.description,
        Video_Length:20});
    }

function createStudentTakeExam(p1,id) {
    StudentTookexam.create({StudentTookExam_ID:id,StudentTookExam_Student_ID:p1.body.StudentTookExam_Student_ID,
    StudentTookExam_Exam_ID:p1.body.StudentTookExam_Exam_ID,StudentTookExam_Type:p1.body.StudentTookExam_Type })
}
async function createStudentTakeCourse(p1,coursePrice) {
   await StudentTakeCourse.create({StudentTakeCourse_CourseID:p1.body.StudentTakeCourse_CourseID,
                                StudentTakeCourse_StudentID:p1.body.StudentTakeCourse_StudentID,
                                StudentTakeCourse_WatchedVideo:p1.body.StudentTakeCourse_WatchedVideo,
                                StudentTakeCourse_StudentTakeExam:p1.body.StudentTakeCourse_StudentTakeExam,
                                StudentTakeCourse_Progress:0,
                                StudentTakeCourse_Type:p1.body.StudentTakeCourse_Type
                              ,StudentTakeCourse_Money_Paid:coursePrice
                             })
}

async function getHoursAllSubtitles(coursename,res,req){
    var y= await course.find({Course_Title:coursename}).select('Course_Subtitle -_id');
    var x = (JSON.stringify(y).split(":"));
    var z= x[1].split("}")
    var a = z[0]
    var array = []
    var data =""
    for (let i =0;i<a.length;i++){
        if(a[i]!="[" & a[i]!='"' & a[i]!="]")
        data+=a[i];
    }
    data = data.split(",")
    var Response = "Subtitles and their Hours :"+ "\n";
    for(let i = 0; i<data.length; i++){
        var Videos = await Subtitle.find({Subtitle_Name:data[i]}).select('Subtitle_Video -_id');
        var xx = (JSON.stringify(Videos).split(":"));
        var zz= xx[1].split("}")
        var aa = zz[0]
        var Dinside =""
    for (let i =0;i<aa.length;i++){
        if(aa[i]!="[" & aa[i]!='"' & aa[i]!="]")
        Dinside+=aa[i];
    }
    Dinside = Dinside.split(",")
        var length = []
        var sum =0
        for(let j = 0; j <Dinside.length; j++){
            var id = Number(Dinside[j]);
            var myVideo = await Video.find({Video_ID:id}).select('Video_Length -_id');
            var xxx = (JSON.stringify(myVideo).split(":"));
            var zzz= xxx[1].split("}")
            var aaa = zzz[0]

            // for (let i =0;i<aaa.length;i++){
            //     if(aaa[i]!="[" & aaa[i]!='"' & aaa[i]!="]")
            //     Vids+=aaa[i];
            // }

            sum+=Number(aaa)
        }
            Response+="Subtitle : "+ data[i] + "'s hours = "+ sum + " mins "+"\n";

    }
        return Response;
        //
}
async function SearchCourseTitle (title) {
    const Course_Title= title
    var data= await course.find({Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
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
        var X = await Instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
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
   
    //console.log(final)
    return final;
  };
async function SearchCourseSubject (subject) {
    const Course_Subject = subject
    var data= await course.find({Course_Subject:Course_Subject},'Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
    console.log(data.length);
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
        var X = await Instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
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
    
    //console.log(final)
    return final;
  };
async function SearchCourseIntrsuctor (instructors) {
    const Course_Instructor = instructors
    var data= await course.find({Course_Instructor:Course_Instructor},'Course_Title Course_Rating Course_Hours Course_Instructor Course_Country Course_Price Course_Trainee CourseID -_id')
    console.log(data);
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
        var X = await Instructor.findOne({Instructor_ID:InstId}).select('Instructor_FirstName Instructor_ID -_id')
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
    
    //console.log(final)
    return final;
  };

  //// sprint 3
function createProblem(p1,username,courseTitle,id){
    Problem.create({Problem_ID:id,User_userName:username,User_Type:p1.User_Type,Problem_Type:p1.Problem_Type,Course_Title:courseTitle,Problem_Status:'Unseen',Problem_Description:p1.Problem_Description})
 }
function createRequest(id,title,company){
    CorpRequest.create({User_ID:id,Course_Title:title,Request_status:'Unseen',User_Company:company})
}
async function createCorpStudentTakeCourse(courseId,studentID){
    await StudentTakeCourse.create({StudentTakeCourse_CourseID:courseId,
         StudentTakeCourse_StudentID:studentID,
         StudentTakeCourse_Progress:0,
         StudentTakeCourse_Type:2,
         StudentTakeCourse_Money_Paid:0
      })
 
 }
async function createRefundRequest(userID,courseID,amount){
    await RefundRequest.create({User_ID:userID,
        Course_ID:courseID,
        Request_Status:'Unseen',
        Refund_Amount:amount
      })
 
 }
  
  module.exports={
    createStudentTakeCourse,
    createStudentTakeExam,
    createCourse,
    getHoursAllSubtitles,
    createSubtitle,
    createVideo,
    createProblem,
    createRequest,
    SearchCourseTitle,SearchCourseSubject, SearchCourseIntrsuctor,
    createCorpStudentTakeCourse,
    createRefundRequest
}
