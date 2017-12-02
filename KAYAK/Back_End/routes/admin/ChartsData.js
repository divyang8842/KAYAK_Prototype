var kafka = require('../kafka/client');

exports.getChartData=function(req,res){

    var year = req.body.year;
    var type = req.body.type;
    if(!type){
        type = 'all';
    }
    var userid = req.body.userid;
    var city = req.body.city;
    kafka.make_request('charts_data',{"year":year,'type':type,'userid':userid,'city':city}, function(err,results){
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