var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgrounds =[
    {name : "Camp 1", image : "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name : "Camp 2", image : "http://www.photosforclass.com/download/2602356334"},
    {name : "Camp 3 ", image : "http://www.photosforclass.com/download/7121865553"}
];

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds : campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image : image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.listen("8080", function(){
    console.log("The YelpCamp server has started!");
});