const signRouter = require('../Controller/accounts.js');
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
const express= require("express")
const router=express.Router();
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

router.post('/createAdmin', (req,res)=>{
    signRouter.createAdmin(req)
    res.send("Create a new admin.")
})

router.post('/createInstructor', (req,res)=>{
    signRouter.createInstructor(req)
    res.send("Create a new Instructor.")
})

router.post('/createCorporateUser', (req,res)=>{
    signRouter.createCorporateUser(req)
    res.send("Create a new corporate user.")
})


router.post('/signUp', (req,res)=>{
    signRouter.signUP(req)
    res.send("Create a new user.")
})

module.exports=router;