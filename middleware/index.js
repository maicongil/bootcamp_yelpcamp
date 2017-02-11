
var middlewareObj = {},
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, campground){
        if(error){
            res.redirect("back");
        }else{
            if(campground.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    });
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, comment){
        if(error){
            res.redirect("back");
        }else{
            if(comment.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    });
    }else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};



module.exports = middlewareObj;