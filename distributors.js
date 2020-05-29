/** Group 24
 ** CS340 Final Project - Bob's Supermarket
 ** Authors: Chelsea Satterwhite and Jennifer Moon 
 ** */
 
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getDistributors(res, mysql, context, complete){
        mysql.pool.query("SELECT d.name, d.phoneNumber, d.address, d.zipcode FROM distributors d", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.distributors = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getDistributors(res, mysql, context, complete);
        //getItems_distributorPage(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('distributors', context);
            }
        }
    });

    //add distributor to database
    router.post('/', function(req, res){
        //console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO distributors (name, phoneNumber, address, zipcode) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.phoneNumber, req.body.address, req.body.zipcode];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/distributors');
            }
        });
    });

    return router;
}();