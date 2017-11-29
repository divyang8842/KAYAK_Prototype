var kafka = require('../kafka/client');

exports.getChartData=function(req,res){

    var year = req.body.year;
    kafka.make_request('charts_data',{"year":year}, function(err,results){
        console.log('in list cars result');
        console.log(results);
        if(err){
            res.status(201).json({output:{}});
        }
        else
        {
            res.status(201).json({output:results});
        }
    });
};