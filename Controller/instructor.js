const instructor = require('../Schemas/Instructor.js');

async function getMyRating(id){
    var count =0
    var y= await instructor.find({Instructor_ID:id}).select('Instructor_ID Instructor_Ratings -_id');
    var x = (JSON.stringify(y).split(":"));
    var z= x[2].split("[")
    var y = x[x.length-1].split("]")
    var w= y[0].split(",")
    var data = 0;
    for (let i =0;i<w.length;i++){
        var inside= w[i].split('"')
        console.log(inside)
        if(inside.length!=1){
        data+=parseInt(inside[1],0);
        count++;}
        else 
        return 0
    }
    var rating = data/count
   
    console.log(data)
    return rating;
}

module.exports = {
    getMyRating
  };