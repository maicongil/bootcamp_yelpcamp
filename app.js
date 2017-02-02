var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    var campgrounds =[
        {name : "Camp 1", image : "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name : "Camp 2", image : "http://www.photosforclass.com/download/2602356334"},
        {name : "Camp 3 ", image : "http://www.photosforclass.com/download/7121865553"}
    ];
    res.render("campgrounds", {campgrounds : campgrounds});
});

app.listen("8080", function(){
    console.log("The YelpCamp server has started!");
});