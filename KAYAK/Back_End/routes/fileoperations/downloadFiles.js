var GLOBAL_TEMP_PATH = "./public/uploads/temp";
var kafka = require('./../kafka/client');

var fileDownload = function(req,res){
    var data = {
        filename: req.param("id"),
        parentpath: req.param("type")
    };
    /*var filename=req.param("id");
    var parentpath =req.param("type");*/
    console.log(JSON.stringify(data));
    kafka.make_request('download_avatar', data, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.status(401).json({status: '401'});
        } else {
            if (results.status == '201' || results.status == 201) {
                res.status(201).json(results);
            } else {
                res.status(401).json({status: '401'});
            }
        }
});
}
exports.fileDownload = fileDownload;