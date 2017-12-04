var fs    = require("fs");
var mkdirs = require('mkdirs');

// function to encode file data to base64 encoded string
var base64_encode =  function(file,callback) {
    // read binary data
    var bufferData = "";
    try{
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        bufferData =  new Buffer(bitmap).toString('base64');
    }catch(ex){
        try{
            var bitmap = fs.readFileSync("./public/uploads/image/no_image.jpeg");
            // convert binary data to base64 encoded string
            bufferData =  new Buffer(bitmap).toString('base64');
        }catch(e){

        }
    }
    callback(bufferData);

};

// function to create file from base64 encoded string
var base64_decode = function(base64str,parent, file,callback) {
    try {
        mkdirs(parent);
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        var bitmap = new Buffer(base64str, 'base64');
        // write buffer to file
        fs.writeFileSync(parent+"/"+file, bitmap);
        console.log('******** File created from base64 encoded string ********');
        callback(true);
    }catch(ex){
        callback(false);
    }
}


exports.base64_decode = base64_decode;
exports.base64_encode = base64_encode;
