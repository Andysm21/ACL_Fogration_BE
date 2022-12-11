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
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

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
    res.status(200).send("Info updated");
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

//change his/her password (31)
router.put("/changePassword/:type", async (req, res) => {
  const pass= req.body.Instructor_Password
  const x= req.body.Instructor_ID  
  if((await instructor.find({Instructor_ID:x},'Instructor_ID -_id')).length != 0){
    await instructor.update({Instructor_ID:x},{Instructor_Password:pass})
    res.status(200).send("Password updated");
  }
  else {
    res.status(409).send("User not found");
  }
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
      const url = `https://loaclhost:3000/password-reset/3/`;
      await sendEmail(email, "Password Reset", url);
    }
  }
    else{
      const url = `https://loaclhost:3000/password-reset/2/`;
      await sendEmail(email, "Password Reset", url);
    }

  }
    else{
    const url = `https://loaclhost:3000/password-reset/1/`;
		await sendEmail(email, "Password Reset", url);
    }

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports=router;