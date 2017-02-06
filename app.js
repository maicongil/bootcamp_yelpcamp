var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    seed = require("./seed.js");

mongoose.connect("mongodb://localhost/yelp_camp");
seed();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name : name, image : image, description : description};
    
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
    res.render("campgrounds/new");
})

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, campground){
        if(error){
            console.log(error);
        }else{
            console.log(campground);
            res.render("campgrounds/show", {campground : campground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res){
     Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            console.log(campground);
            res.render("comments/new", {campground : campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
     Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

app.listen("8080", function(){
    console.log("The YelpCamp server has started!");
});