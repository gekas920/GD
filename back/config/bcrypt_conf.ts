const bcrypt = require('bcrypt');
module.exports = bcrypt;
module.exports.salt = bcrypt.genSaltSync(10);