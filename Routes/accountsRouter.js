const signRouter = require('../Controller/accounts.js');
const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const cu = require('../Schemas/CorporateUser.js');
const inst = require('../Schemas/Instructor.js');
const course = require('../Schemas/Course.js');


const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
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
    await cu.findOneAndUpdate({CorporateUser_ID:userid},{CorporateUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })
  router.post('/changeCountryIU', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await user.findOneAndUpdate({IndividualUser_ID:userid},{IndividualUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })
router.post('/createAdmin', async (req,res)=>{
    if(req.body.Admin_username.equals(''))
        res.send("Username field should not be empty")
    else if(req.body.Admin_Password.equals(''))
        res.send("Password field should not be empty")
    else if(await (await user.find({Admin_Username: req.body.Instructor_username}).select('Admin_username')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createAdmin(req)
        res.send("Create a new admin.")
    }
})

router.post('/createInstructor',async (req,res)=>{
    if(req.body.Instructor_username.equals(''))
        res.send("Username field should not be empty")
    else if(req.body.Instructor_Password.equals(''))
        res.send("Password field should not be empty")
    else if(await (await (user.find({Instructor_Email: req.body.Instructor_Email}).select('Instructor_Email'))).length > 0)
        res.send("User already exists.")
    else 
        if(await (await user.find({Instructor_username: req.body.Instructor_username}).select('Instructor_username')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createInstructor(req)
        res.send("Create a new Instructor.")
    }
})

router.post('/createCorporateUser', async (req,res)=>{
    if(req.body.CorporateUser_UserName.equals(''))
        res.send("Username field should not be empty")
    else if(req.body.CorporateUser_Password.equals(''))
        res.send("Password field should not be empty")
    else if(await (await (user.find({CorporateUser_Email: req.body.CorporateUser_Email}).select('CorporateUser_Email'))).length > 0)
        res.send("User already exists.")
    else 
        if(await (await user.find({CorporateUser_UserName: req.body.CorporateUser_UserName}).select('CorporateUser_UserName')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createCorporateUser(req)
        res.send("Create a new corporate user.")
    }
    
})

router.post('/createCourse', async (req,res)=>{
    if(await (await (course.find({Course_Title: req.body.Course_Title}).select('Course_Title'))).length > 0)
        res.send("Course already exists.")
    else{
    var id = await course.count().exec()+1;
    courseRouter.createCourse(req,id)
    res.send("Create a new course.")
    }
})


router.post('/signUp', async (req,res)=>{
    if(await (await (user.find({individualUser_Email: req.body.individualUser_Email}).select('individualUser_Email'))).length > 0)
        res.send("User already exists.")
    else 
        if(await (await user.find({individualUser_UserName: req.body.individualUser_UserName}).select('individualUser_UserName')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.signUP(req)
        res.send("Create a new user.")
    }
})



module.exports=router;