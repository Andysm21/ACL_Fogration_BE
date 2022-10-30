const courseRouter = require('../Controller/courses.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
const course = require('../Schemas/Course.js');

//to be changed later
router.post('/createCourse', (req,res)=>{
    courseRouter.createCourse(req)
    res.send("Create a new course.")
})


router.get("/getCourse", async (req, res) => {
    console.log(await course.find())
    res.status(200).send("Courses In Terminal");
  });



module.exports=router;