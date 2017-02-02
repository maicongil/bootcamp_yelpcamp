var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name : String, 
    image : String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds", {campgrounds : campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image : image};
    
    Campground.create(
        newCampground, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.listen("8080", function(){
    console.log("The YelpCamp server has started!");
});