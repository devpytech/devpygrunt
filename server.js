var mailgun = require('mailgun-js')({apiKey: "MyAPIkey", domain: "devpy.me"});

var mlist = mailgun.lists('testlist@devpy.me');

var express = require('express');  
var bodyParser = require('body-parser');  
var validator = require('validator');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.post('/subscribe', function (req, res) {  
    var email = req.body.email;
    if(!email || !validator.isEmail(email)) return res.json({success: false, error: "That's not a valid email."});
    mlist.members().create({subscribed: true, address: email}, function (err, data) {
        if(data.message.indexOf("Address already exists") > -1) return res.json({success: false, error: "You're already subscribed. Thanks!"});
        res.json({success: true});
    });
});

app.listen(process.env.PORT);  
console.log("listening");
