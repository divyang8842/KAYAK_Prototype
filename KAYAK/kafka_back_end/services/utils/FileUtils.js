// function to encode file data to base64 encoded string
var base64_encode =  function(file,callback) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    var bufferData =  new Buffer(bitmap).toString('base64');

    callback(bufferData);
};

// function to create file from base64 encoded string
var base64_decode = function(base64str, file,callback) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
    callback(true)
}


exports.base64_decode = base64_decode;
exports.base64_encode = base64_encode;
