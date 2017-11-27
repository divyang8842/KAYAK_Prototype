var GLOBAL_TEMP_PATH = "./public/uploads/temp";
var kafka = require('./../kafka/client');

var fileDownload = function(req,res){
  
    var data = {
        filename: req.body.id,
        parentpath: req.body.type
    };
    //console.log(JSON.stringify(data));
    kafka.make_request('download_avatar', data, function (err, results) {
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
