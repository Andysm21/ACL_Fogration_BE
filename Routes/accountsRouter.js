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

router.post('/changeCountry', async (req,res)=>{
    var country = req.body.country;
    var userid = req.body.userid;
    await user.findByIdAndUpdate({IndividualUser_ID:userid},{IndividualUser_Country:country})
    res.send("Country changed to "+ country+" Successfully");
  })

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

router.post('/createInstructor',async (req,res)=>{
    var id = await inst.count().exec()+1;

    if(req.body.Instructor_username=="")
        res.send("Username field should not be empty")
    else if(req.body.Instructor_Password=="")
        res.send("Password field should not be empty")
    else 
        if(await (await inst.find({Instructor_username: req.body.Instructor_username}).select('Instructor_username')).length > 0)
        res.send("Choose another username.")
    else{
        signRouter.createInstructor(req,id)
        res.send("Create a new Instructor.")
    }
})

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

router.post('/createCourse', async (req,res)=>{
    var id = await course.count().exec()+1;
    if(await (await (course.find({Course_Title: req.body.Course_Title}).select('Course_Title '))).length>0)
        res.send("Course already exists.")
    else{
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