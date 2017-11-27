
var authenticate = function (req, res, next) {
    var session = req.session;
    console.log("SESSIONS"+JSON.stringify(session));
    if(session && session.user && session.user.id && session.user.id>0){
        var isAuthenticated = true;
    }
    if (isAuthenticated) {
        next();
    }
    else {
        res.status(501).json({status:'501',message:'invalid user.'});
    }
}

var authenticateAdmin = function (req, res, next) {
    var session = req.session;
console.log("SESSIONS"+JSON.stringify(session));
    if(session && session.user && session.user.user_id && session.user.user_id>0 && session.user.user_type==1){
        var isAuthenticated = true;
    }

    if (isAuthenticated) {
        console.log("HERE");
        next();
    }
    else {
        res.status(501).json({status:'501',message:'invalid user.'});
    }
};

var getLoggedInInfoFromSession = function(req,res){
    var session = req.session;
    var userid = req.body.id;
    if(session && session.user && session.user.id && session.user.id==userid){
        res.status(200).json({status:'200',userid:session.user.id,type:session.user.type,firstname:session.user.firstname});
    }else{
        res.status(501).json({status:'501',message:'invalid user.'});
    }
};
exports.authenticate=authenticate;
exports.authenticateAdmin = authenticateAdmin;
exports.getLoggedInInfoFromSession = getLoggedInInfoFromSession;