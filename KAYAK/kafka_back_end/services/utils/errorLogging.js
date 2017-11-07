var mongo = require('./../database/mongo');

var logError = function(jsfilename, functionname,err){
    mongo.insertDoc("errorLog",{filename:jsfilename, functionName : functionname,error:err},function(err,results){
        if(err){
            console.log("Error logging failed.");
        }else{
            console.log("Error occurred in "+jsfilename+", function  "+functionname+".");
            console.log("Error : "+err);
        }
    })
}

exports.logError = logError;