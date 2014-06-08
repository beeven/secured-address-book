var express = require("express"),
    app     = express(),
    https   = require("https"),
    http    = require("http"),
    fs      = require("fs");

var departmentsModule = require("./modules/departments");



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
    res.send("Hello");
});

app.use("/api/departments",departmentsModule);
