var mailgun = require('mailgun-js')({apiKey: "key-138c39d869f0c42dbfcde1528c195a06", domain: "devpy.me"});

var mlist = mailgun.lists('testlist@devpy.me');

var express = require('express');  
var bodyParser = require('body-parser');  
var validator = require('validator');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json())  
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/subscribe', function (req, res) {  
    var email = req.body.email;
    if(!email || !validator.isEmail(email)) return res.json({success: false, error: "Oops! Incorrect email!"});
    mlist.members().create({subscribed: true, address: email}, function (err, data) {

        if(data.message.indexOf("Address already exists") > -1) return res.json({success: false, error: "Oops! This email has already been added!"});
        res.json({success: true});
    });
});

app.listen(process.env.PORT);  
console.log("We're listening on port 8080!");