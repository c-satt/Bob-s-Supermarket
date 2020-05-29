var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
 	host            : 'classmysql.engr.oregonstate.edu',
 	user            : 'cs340_satterwc',
 	password        : '8104',
 	database        : 'cs340_satterwc'
});
module.exports.pool = pool;