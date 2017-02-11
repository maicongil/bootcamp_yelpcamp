var express =require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport"),
    middleware = require("../middleware/index.js");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req ,res){
    res.render("register");
});

router.post("/register", function(req ,res){
    User.register(new User({
        username : req.body.username
    }), req.body.password, function(error, user){
        if(error){
            console.log(error);
            res.render("register");
        }else{
            passport.authenticate("local")(req , res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {successRedirect : "/campgrounds", failureRedirect : "/login"}), function(req, res){

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;