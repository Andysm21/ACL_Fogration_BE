var bodyParser = require('body-parser');
const mongoDb = require('mongoose');
const express= require("express");
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');
const instructor = require('../Schemas/Instructor.js');
const instructorRouter = require('../Controller/instructor.js');

router.get('/viewMyCoursesInstructor', async (req,res)=>{
    const x = req.body.Instructor_FirstName
    var data ="Titles of Courses" + "\n"
     data += await course.find({Course_Instructor: x}).select('Course_Title -_id') + "\n"
    res.status(200).send(data);
  });


  router.get("/SearchCourseTitleInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const Course_Title= req.body.Course_Title
    if(Course_Title == ''){
        var data = "Searched by Titles: "+ "\n"
       data+=course.find('Course_Title Course_Rating Course_Hours -_id');
        res.status(200).send(data);
    }
    else if(await course.find({Course_Instructor: Instructor_FirstName, Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id').length == 0)
    {  
        res.status(200).send("Titles Not Found");
        console.log("Titles Not Found");
    }   
    else{
      var data = await course.find({Course_Instructor: Instructor_FirstName, Course_Title:Course_Title},'Course_Title Course_Rating Course_Hours -_id') + '\n'
      res.status(200).send("Searched by Titles" + "\n"+ data);
        }
        
    
  });

  router.get("/SearchCourseSubjectInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const SearchSubject= req.body.SearchSubject
    if(SearchSubject == ''){
      var data = course.find('Course_Title Course_Rating Course_Hours -_id')
      res.status(200).send("Searched by Subject" + "\n"+ data);
    }
    else if(await course.find({Course_Instructor: Instructor_FirstName, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours -_id').length == 0)
    {
            res.status(200).send("Subject Not Found");
            console.log("Subject Not Found");
        } 
    else{
        var data = await course.find({Course_Instructor: Instructor_FirstName, Course_Subject:SearchSubject},'Course_Title Course_Rating Course_Hours -_id')
        res.status(200).send("Searched by Subject" + "\n"+ data);
      }
        
  });

  router.get("/filterPriceInst", async (req, res) => {
    const Instructor_FirstName = req.body.Instructor_FirstName
    const FilterPrice= req.body.FilterPrice
    
    var data= await course.find({Course_Instructor:Instructor_FirstName,Course_Price: FilterPrice},'Course_Title Course_Rating Course_Hours -_id')
    res.status(200).send("Filtered by Price"+"\n"+ data);
  });

  router.get("/filterSubjectInst", async (req, res) => {
    const x = req.body.Instructor_ID
    const {FilterSubject} = req.body
    console.log(await course.find({Course_Instructor: x, Course_Subject:FilterSubject},'Course_Title Course_Rating Course_Hours -_id'))
    res.status(200).send("Filtered by Subject");
  });

  //view the ratings and reviews on all his/her courses (19)
router.get("/ViewRatingAndReviews", async (req, res) => {
  const x= req.body.Instructor_ID
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
  console.log(await course.find({Course_Instructor:x},'Course_Title Course_Rating Course_Review -_id'))
  res.status(200).send(await course.find({Course_Instructor:x},'Course_Title Course_Rating Course_Review -_id'));
  }
  else {
    res.status(404).send("User not found");
  }

});

//view his/her rating and reviews as an instructor(28)
router.get("/ViewMyRatingAndReviews", async (req, res) => {
  const x= req.body.Instructor_ID
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    const method = await instructorRouter.getMyRating(x);
    var y= await instructor.find({Instructor_ID:x},'Instructor_ID Instructor_Reviews -_id') 
    y+= "Instructor_Rating: " + method
    res.status(200).send(y);
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
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    await instructor.update({Instructor_ID:x},{Instructor_Email:email, Instructor_Biography:bio})
    res.status(200).send("Info updated");
  }
  else {
    res.status(404).send("User not found");
  }
});

//change his/her password (31)
router.put("/changePassword", async (req, res) => {
  const pass= req.body.Instructor_Password
  const x= req.body.Instructor_ID  
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    await instructor.update({Instructor_ID:x},{Instructor_Password:pass})
    res.status(200).send("Info updated");
  }
  else {
    res.status(404).send("User not found");
  }
});


module.exports=router;