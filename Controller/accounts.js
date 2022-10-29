const express= require("express")
const router=express.Router();
var bodyParser = require('body-parser');
const mongoDb = require('mongoose')
const user = require('../Schemas/IndividualUser.js');
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());









module.exports= account;