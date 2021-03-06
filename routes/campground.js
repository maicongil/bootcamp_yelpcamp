var express =require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware/index.js");

router.get("/", function(req, res){
    Campground.find({}, function(error, campgrounds){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name : name, image : image, description : description, author : author, price : price};
    
    Campground.create(newCampground, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/show", {campground : campground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.render("campgrounds/edit", {campground : campground});
        }
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
       Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, campground){
        if(error){
            console.log(error);
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error){
        if(error){
            console.log(error);
        }
        res.redirect("/campgrounds");
    })
});

module.exports = router;