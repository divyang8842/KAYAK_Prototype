// Defined authentication middleware BEFORE your routes
var authenticate = function (req, res, next) {
    var session = req.session;

    if(session && session.userid && session.userid>0){
        var isAuthenticated = true;
    }
    if (isAuthenticated) {
        next();
    }
    else {
        res.status(501).json({status:'501',message:'invalid try.'});
    }
}
exports.authenticate=authenticate;