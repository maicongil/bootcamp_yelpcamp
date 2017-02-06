var mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment.js");

var campgrounds = [
    {
        name : "Lake View",
        image : "https://farm3.staticflickr.com/2923/13950231147_7032e443a0.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris urna, pretium non metus vitae, auctor aliquam nibh. Sed ut mauris auctor, pretium diam at, posuere libero. Nullam finibus libero est, sed faucibus neque lobortis ut. Sed mi ipsum, congue in placerat non, vestibulum sit amet est. Maecenas ac dui vitae risus dignissim facilisis ac at ipsum. Donec gravida eleifend auctor. Pellentesque sit amet elementum purus. Vivamus vitae mi id tellus sodales rutrum."
    },
    {
        name : "Mountain Foot",
        image : "https://farm3.staticflickr.com/2054/2229707213_302c00f6b5.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris urna, pretium non metus vitae, auctor aliquam nibh. Sed ut mauris auctor, pretium diam at, posuere libero. Nullam finibus libero est, sed faucibus neque lobortis ut. Sed mi ipsum, congue in placerat non, vestibulum sit amet est. Maecenas ac dui vitae risus dignissim facilisis ac at ipsum. Donec gravida eleifend auctor. Pellentesque sit amet elementum purus. Vivamus vitae mi id tellus sodales rutrum."
    },
    {
        name : "Pine Forest",
        image : "https://farm9.staticflickr.com/8438/7968780788_e567047910.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris urna, pretium non metus vitae, auctor aliquam nibh. Sed ut mauris auctor, pretium diam at, posuere libero. Nullam finibus libero est, sed faucibus neque lobortis ut. Sed mi ipsum, congue in placerat non, vestibulum sit amet est. Maecenas ac dui vitae risus dignissim facilisis ac at ipsum. Donec gravida eleifend auctor. Pellentesque sit amet elementum purus. Vivamus vitae mi id tellus sodales rutrum."
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

