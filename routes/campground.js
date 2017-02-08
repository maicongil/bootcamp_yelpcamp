var express =require("express"),
    router = express.Router(),
    Campground = require("../models/campground");

router.get("/", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name : name, image : image, description : description, author : author};
    
    Campground.create(newCampground, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, campground){
        if(error){
            console.log(error);
        }else{
            console.log(campground);
            res.render("campgrounds/show", {campground : campground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;