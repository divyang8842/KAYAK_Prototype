var bcrypt = require('bcrypt');

var encrypt = function(pwd) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(pwd, salt);
	return hash;
};



var compareEncrypted = function(pwd,hash){
	return bcrypt.compareSync(pwd, hash); 
};


exports.encrypt=encrypt;
exports.compareEncrypted=compareEncrypted;
	