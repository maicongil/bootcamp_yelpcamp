//LIBS IMPORT
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
//END LIBS IMPORT

var port = process.env.PORT || 8000,
    mongoUrl = process.env.MONGO_URL || "mongodb://localhost/yelp_camp";

//MODELS IMPORT
var Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js"),
    User = require("./models/user.js");
//END MODELS IMPORT

//ROUTES IMPORT
var indexRoutes = require("./routes/index.js"),
    campgroundRoutes = require("./routes/campground.js"),
    commentRoutes = require("./routes/comment.js");
//END ROUTES IMPORT

//DATABASE SEED IMPORT
var seedDB = require("./seed.js");

mongoose.connect(mongoUrl);
// seedDB();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret : "Ruffy and Scooby",
    resave : false,
    saveUninitialized :false
}));

app.use(flash());

//PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//END PASSPORT CONFIG

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, function(){
    console.log("The YelpCamp server has started!");
});