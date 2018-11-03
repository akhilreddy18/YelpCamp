const express = require("express"),
          app = express(),
   bodyParser = require("body-parser"),
         port = 3000,
     mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//                 {

//                  name: "Mountain Goat",
//                  image: "https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg"

//                 }, function(err, campground){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log("Newly created campground");
//                         console.log(campground);
//                     }
//                 });


var campgrounds = [
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Mountain Goat", image: "https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg"},
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Mountain Goat", image: "https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg"},
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Mountain Goat", image: "https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg"}
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            coonsole.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});   
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
})

  
app.listen(port, function(){
    console.log("Yelpcamp server started at port "+ port);
})
