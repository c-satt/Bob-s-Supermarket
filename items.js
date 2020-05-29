/** Group 24
 ** CS340 Final Project - Bob's Supermarket
 ** Authors: Chelsea Satterwhite and Jennifer Moon 
 ** */
 
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT i.itemName, i.brand, i.department, i.price, i.qty FROM items i", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getItems(res, mysql, context, complete);
        //getDistributors_itemsPage(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('items', context);
            }
        }
    });


    //add items to database
    router.post('/', function(req, res){
        //console.log(req.body.distributorName)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO items (itemName, brand, department, price, qty) VALUES (?,?,?,?,?)";
        var inserts = [req.body.itemName, req.body.brand, req.body.department, req.body.price, req.body.qty];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/items');
            }
        });
    });



    return router;
}();