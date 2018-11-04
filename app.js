const express = require("express"),
          app = express(),
   bodyParser = require("body-parser"),
         port = 3000,
     mongoose = require("mongoose"),
     Campground = require("./models/campground"),
        seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
seedDB();


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            coonsole.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});   
        }
    })
});

app.post("/campgrounds", function(req,res){

    var newCampground = 
    {
        name: req.body.campgroundName, 
        image: req.body.campgroundImage
    }

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })    
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("show", {campground: foundCampground})
        }
    })
}); 

  
app.listen(port, function(){
    console.log("Yelpcamp server started at port "+ port);
})
