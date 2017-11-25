var express = require('express');
var router = express.Router();
var multer = require('multer');

var GLOBAL_TEMP_PATH = "./public/uploads/temp";

var kafka = require('./../kafka/client');

var fs = require('fs');

var path = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        createDirectory(GLOBAL_TEMP_PATH,function(){});
        cb(null, GLOBAL_TEMP_PATH);
    },
    filename: function (req, file, cb) {
        path = file.originalname;
        cb(null, file.originalname);
    }
});

var createDirectory = function(filepath,callback){

    fs.mkdir(filepath, function (err) {
        if (err)  {callback(err,filepath);}
        else  {callback(err,filepath);}
    });
};

var uploads = multer({storage:storage}).single('avatar');

// function to encode file data to base64 encoded string
function base64_encode(file,callback) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    var bufferData =  new Buffer(bitmap).toString('base64');

    callback(bufferData);
};

var fileupload = function (req, res) {
    uploads(req, res, function (err) {
        if (err) {
            res.status(501).json({status: '501'});
        }else{
            var picType = req.body.type;
            var picId = req.body.id;
            var filename = picType+"_"+picId+"."+path.split('.').pop();
            var path = picType;

            base64_encode(GLOBAL_TEMP_PATH+'/'+path,function(bufferData){
                fs.unlinkSync(GLOBAL_TEMP_PATH+'/'+path);
                var data = {
                    filename : filename,
                    parentpath : path,
                    userid: req.session.user.userid,
                    bufferdata : bufferData
                };
                kafka.make_request('upload_avatar',data, function(err,results) {
                    console.log('in result');
                    console.log(results);
                    if(err){
                        res.status(401).json({status: '401'});
                    }
                    else
                    {
                        if(results.status == '201' || results.status == 201){

                            res.status(201).json({status: '201'});
                        }
                        else {
                            res.status(401).json({status: '401'});
                        }
                    }
                });

            })

        }
    })
};

router.post('/profile', fileupload);
module.exports = router;