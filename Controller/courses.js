const express= require("express")
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const course = require('../Schemas/Course.js');
const Video = require('../Schemas/Video.js');


function createCourse(p1,id) {
// const {Course_ID}=p1.body.body
// if({Course_ID}==course.find({Course_ID:Course_ID})){
//     p2.status(200).send("Course ID already in the system ");
// }
// else{
    course.create({Course_ID:id,Course_Title:p1.body.title,Course_Subject:p1.body.subject,Course_Description:p1.body.description
        ,Course_Price:p1.body.price,Course_Rating:p1.body.rating,Course_Instructor:p1.body.instructor,Course_Hours:p1.body.hours,Course_Country:p1.body.country,
        Course_Discount:p1.body.discount,Course_Discount_Duration:p1.body.discount_duration,Course_Subtitle:p1.body.subtitle,Course_Trainee:p1.body.trainee,
        Course_Review:p1.body.review,Course_Rate:p1.body.rate,Course_Exam:p1.body.exam})
// }p
}

function getHoursAllSubtitles(coursename,res,req){
    const Course=course.find({Course_Title:coursename});
    for(let i = 0; i<Course.Course_Subtitle.length; i++){
        const Videos=Subtitle.find({Subtitle_Name:Course.Course_Subtitle[i]},"Subtitle_Video");
        var sum=0;
        for(let j = 0; j <videos.length; j++){
            sum+=Videos[j].Video_Length;
        }
        res.status(200).send("Subtitle : "+ Course.Course_Subtitle[i].Subtitle.Name + "'s hours :"+ sum);

    }
    

}




module.exports={createCourse}