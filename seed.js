var mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js");

var campgrounds = [
    {
        name : "Lake View",
        image : "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg",
        description : "Nice lake view"
    },
    {
        name : "Mountain Foot",
        image : "https://farm3.staticflickr.com/2054/2229707213_302c00f6b5.jpg",
        description : "Spetacular spot"
    },
    {
        name : "Pine Forest",
        image : "https://farm9.staticflickr.com/8438/7968780788_e567047910.jpg",
        description : "A lot of shadow"
    }
]

var comment = {
    author : "John Doe",
    text : "Nice place, nice view, I loved the place."
}

function seed(){
    //remove all data
    Campground.remove({}, function(error){
        if(error){
            console.log(error);
        }else{
            console.log("Campgrounds removed");
            Comment.remove({}, function(error){
                if(error){
                    console.log(error);
                }else{
                    console.log("Comments removed");
                    campgrounds.forEach(function(campground){
                        Campground.create(campground, function(error, campground){
                            if(error){
                                console.log(error);
                            }else{
                                console.log(campground);
                                Comment.create(comment, function(error, comment){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log(campground);
                                    }
                                });
                            }
                        })
                    });
                }
            });
        }
    });
    //create campground
    //create comments
    //associate associate comments and campground
}

module.exports =  seed;

