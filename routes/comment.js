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

router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(error, foundComment){
        if(error){
            console.log(error);
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
        }
    });
});

router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment, function(error, updatedComment){
        if(error){
            console.log(error);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            console.log(error);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
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