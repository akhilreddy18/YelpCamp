const express = require("express"),
        router = express.Router(),
        Campground = require("../models/campground");

router.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            coonsole.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});   
        }
    })
});

router.post("/campgrounds", function(req,res){

    Campground.create(req.body.campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })    
});

router.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
}); 

module.exports = router;