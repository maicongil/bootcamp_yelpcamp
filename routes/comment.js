var express =require("express"),
    router = express.Router({mergeParams:true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            console.log(campground);
            res.render("comments/new", {campground : campground});
        }
    });
});

router.post("/", isLoggedIn, function(req, res){
     Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }else{
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
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