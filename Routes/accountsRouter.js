const signRouter = require('../Controller/accounts.js');
const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const inst = require('../Schemas/Instructor.js');
const Admin = require('../Schemas/Administrator.js');
const course = require('../Schemas/Course.js');''
const corp = require('../Schemas/CorporateUser.js');''


const express= require("express")
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
        res.send("Username field should not be empty")
    else if(req.body.Admin_Password=="")
        res.send("Password field should not be empty")
    else if(await (await Admin.find({Admin_Username: req.body.Admin_Username}).select('Admin_Username')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createAdmin(req,id)
        res.send("Create a new admin.")
    }
})

//56 add instructors and create their usernames and passwords
router.post('/createInstructor',async (req,res)=>{
    var id = await inst.count().exec()+1;

    if(req.body.Instructor_username=="") //Username field should not be empty
        res.send("1")
    else if(req.body.Instructor_Password=="") //Password field should not be empty
        res.send("2")
    else 
        if(await (await inst.find({Instructor_username: req.body.Instructor_username}).select('Instructor_username')).length > 0)
        //Choose another username.
        res.send("3")
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
        res.send("Username field should not be empty")
    else if(req.body.CorporateUser_Password=="")
        res.send("Password field should not be empty")
    else 
        if(await (await corp.find({CorporateUser_UserName: req.body.CorporateUser_UserName}).select('CorporateUser_UserName')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createCorporateUser(req,id)
        res.send("Create a new corporate user.")
    }
    
})

//23 create a new course and fill in all its details 
//inclding title, subtitles, price and short summary about the entire course
router.post('/createCourse', async (req,res)=>{
    var id = await course.count().exec()+1;
    if(await (await (course.find({Course_Title: req.body.Course_Title}).select('Course_Title '))).length>0)
        res.send("Course already exists.")
    else if(req.body.Course_Title!= null && req.body.Course_Subtitle != null && req.body.Course_Price != null && req.body.Course_Description != null && req.body.Course_Subject != null && req.body.Course_Instructor != null && req.body.Course_Country != null) {
        courseRouter.createCourse(req,id)
        res.send("Create a new course.")
        }
    else{
        res.send("Please fill all required fields")
        }
       
})

// 3 sign up for an account as an individual trainee using
// a username, email, password, first name, last name and gender
router.post('/signUp', async (req,res)=>{
    var id = await user.count().exec()+1;
    if(await (await (user.find({individualUser_Email: req.body.individualUser_Email}).select('individualUser_Email'))).length > 0)
        res.send("User already exists.")
    else 
        if(await (await user.find({individualUser_UserName: req.body.individualUser_UserName}).select('individualUser_UserName')).length > 0)
        res.send("Choose another username.")
    else if(req.body.individualUser_UserName!= null && req.body.individualUser_Password != null && req.body.individualUser_Email != null && req.body.individualUser_FirstName != null && req.body.individualUser_LastName != null && req.body.individualUser_Gender != null && req.body.individualUser_Country != null) {
        signRouter.signUP(req,id)
        res.send("Create a new user.")
    }
    else {
        res.send("Please fill all required fields")
    }

})



module.exports=router;