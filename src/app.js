const express = require("express");
const mongoose = require('mongoose');
const accountsRouter = require('../Routes/accountsRouter')
const instructorRouter = require('../Routes/instructorRouter')

//Check db connection links in README file
const MongoURI = 'mongodb+srv://ACLFogr:Fogration2022@aclfogration.gnt7ffl.mongodb.net/?retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
//const user = require('./Models/User');



// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")

// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));



// CODE STARTS HERE

app.get("/home", (req, res) => {
    res.status(200).send("Home Page");
  });

// Routers Here

app.use('/',accountsRouter)
app.use('/',instructorRouter)

