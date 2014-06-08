/**
 * Created by beeven on 1/6/14.
 */


var express = require("express"),
    router  = express.Router();


router.get("/",function(req,res){
   res.json([
       {name: "IT", id:"it",count:76},
       {name: "HR", id:"hr", count:32}
   ]);
});


router.get("/:deptId",function(req,res){
    var deptId = req.params.deptId;
    res.json([
        {name:"Beeven", id:"5150780"}
    ]);
});



module.exports = router;