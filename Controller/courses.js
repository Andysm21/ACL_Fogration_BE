const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const course = require('../Schemas/Course.js');
const Video = require('../Schemas/Video.js');
const Subtitle = require('../Schemas/Subtitle.js');
const { response } = require("express");


function createSubtitle(p1,id){
Subtitle.create({Subtitle_ID:id,Subtitle_Name:p1.body.name,Subtitle_Course_ID:p1.body.cid,Subtitle_Video:p1.body.videos,Subtitle_Hours:p1.body.hours})
}

function createVideo(p1,id){
Video.create({Video_ID:id,Video_Link:p1.body.link,Video_Subtitle:p1.body.subtitle,Video_Description:p1.body.desc,Video_Length:p1.body.length});
}
function createCourse(p1,id) {
    course.create({Course_ID:id,Course_Title:p1.body.Course_Title,Course_Subject:p1.body.Course_Subject,Course_Description:p1.body.Course_Description
        ,Course_Price:p1.body.Course_Price,Course_Rating:p1.body.Course_Rating,Course_Instructor:p1.body.Course_Instructor,
        Course_Hours:p1.body.Course_Hours,Course_Country:p1.body.Course_Country,
        Course_Discount:p1.body.Course_Discount,Course_Discount_Duration:p1.body.Course_Discount_Duration,
        Course_Subtitle:p1.body.Course_Subtitle,Course_Trainee:p1.body.Course_Trainee,
        Course_Review:p1.body.Course_Review,Course_Rate:p1.body.Course_Rate,Course_Exam:p1.body.Course_Exam})
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
            var array = []
            var Vids =""
            for (let i =0;i<aaa.length;i++){
                if(aaa[i]!="[" & aaa[i]!='"' & aaa[i]!="]")
                Vids+=aaa[i];
            }
            Vids = Vids.split(",")
            sum+=Number(Vids[0])
        }
            Response+="Subtitle : "+ data[i] + "'s hours = "+ sum + " mins "+"\n";

    }
        return Response;
}






module.exports={createCourse,getHoursAllSubtitles,createSubtitle,createVideo}