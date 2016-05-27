var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX route show all campgrounds
router.get('/',function(req, res) {
    // Get all campgrounds from db
    Campground.find({},function(error,allCampgrounds){
        if(error)
        {
            console.log("Error");
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

// CREATE - Add new campground to db
router.post('/',middleware.isLoggedIn,function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name:name, image:image, description:desc, author: author};
    // Create a new campground and save to db
    Campground.create(newCampground, function(error,campground){
            if(error)
            {
                console.log("Something went wrong");
                console.log(error);
            }
            else
            {
                // redirect backto campgrounds page
                // console.log(campground);
                res.redirect('/campgrounds');
            }
    });
    
});

// NEW show form to create new campground
router.get('/new',middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

// SHOW shows more info about one campground
router.get('/:id',function(req,res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
       if(error)
       {
           console.log(error);
        }
        else{
            // render show template with that campground
            //console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground}) ;
        }
    });
   
});

// Edit Campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership,function(req, res) {
   Campground.findById(req.params.id,function(error,foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
                
    });
    
});

// Update Campground route
router.put('/:id',middleware.checkCampgroundOwnership,function(req,res){
   // find and update the corect campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground,function(error,updatedCampground){
       if(error)
       {
           res.redirect('/campgrounds');
       }
       else
       {
           res.redirect('/campgrounds/'+req.params.id);
       }
   });
   // redirect somewhere (show page)
});

//Delete route
router.delete('/:id',middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(error){
       if(error)
       {
           res.redirect('/campgrounds');
       }
       else
       {
           res.redirect('/campgrounds');
       }
    });
});

// Middleware





module.exports = router;