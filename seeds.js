var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Lake Creek",
        image: "data:image/jpeg;base64,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",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."        
    },
    {
        name: "Camping icon",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRJRjO9RE5EBBX_U67u95oz4ODMSFDukiojRSi7oCKZ2XlBZsDzw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."        
    },
    {
        name: "OnGround Camp",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4BEsYmQuihqOagIYqScU49q_k-Ka5rYcHSWQ3qhw_UuN7jiUE",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."        
    }    
];


function seedDB()
{
    // Remove all campgrounds
    Campground.remove({}, function(error){
        // if(error)
        // {
        //     console.log(error);
        // }
        // //Add few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(error, campground){
        //         if(error)
        //         {
        //             console.log(error);
        //         }
        //         else
        //         {
        //             console.log("Added new campground");
        //             Comment.create(
        //                 {
        //                     text: "This is great, wish to have this shown up",
        //                     author: "Horner"
        //                 }, 
        //                 function(error, comment){
        //                     if(error)
        //                     {
        //                         console.log(error);
        //                     }
        //                     else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //             });
        //         }
        //     });
        // });
    
    });
    
    
    // Add a few comments
}

module.exports = seedDB;
