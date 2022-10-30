const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

//to be changed later
router.post('/createCourse', (req,res)=>{
    courseRouter.createCourse(req)
    res.send("Create a new course.")
})

router.get('/getCourse', (req,res)=>{
    console.log(courseRouter.getCourse())
})



module.exports=router;