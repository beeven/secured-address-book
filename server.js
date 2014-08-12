var express = require("express"),
    app     = express(),
    https   = require("https"),
    http    = require("http"),
    fs      = require("fs");

var departmentController= require("./modules/departmentCtrl");
var staffController = require("./modules/staffCtrl");


var options = {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/imac.crt"),
    ca: [fs.readFileSync("certs/ca.crt")],
    rejectUnauthorized: true,
    requestCert: true
};

app.use(express.static(__dirname+"/public"));



https.createServer(options,app).listen(8443);
http.createServer(app).listen(8080);

app.get("/",function(req,res){
    res.redirect("/index.html");
});

app.use("/api/departments",departmentController);

app.use("/api/staff",staffController);


