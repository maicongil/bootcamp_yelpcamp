
var middlewareObj = {},
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, campground){
        if(error){
            req.flash("error", "Comment not found!")
            res.redirect("back");
        }else{
            if(campground.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that!")
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, comment){
        if(error){
            req.flash("error", "Campground not found!")
            res.redirect("back");
        }else{
            if(comment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You don't have permission to do that!")
                res.redirect("back");
            }
        }
    });
    }else{
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("/login");
};



module.exports = middlewareObj;