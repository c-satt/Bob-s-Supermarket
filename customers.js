/**	Group 24
 **	CS340 Final Project - Bob's Supermarket
 ** Authors: Chelsea Satterwhite and Jennifer Moon 
 ** */

 module.exports = function(){
    var express = require('express');
    var router = express.Router();

    //function to get the customers from database to display on the page
    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT CONCAT(firstName, ' ', lastName) AS customerName, c.phoneNumber, c.zipcode, c.email, c.memberDate, MAX(s.saleDate) as lastTransaction FROM customers c LEFT JOIN sales s ON s.fk_customerId = c.customerId GROUP BY c.customerId", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    //actual call to display customers on the page 
    router.get('/', function(req, res){
    	var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }
        }
    });

    //add customers to database
    router.post('/', function(req, res){
    	//console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (firstName, lastName, phoneNumber, zipcode, email, memberDate) VALUES (?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.zipcode, req.body.email, req.body.memberDate];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/customers');
            }
        });
    });

    return router;
}();