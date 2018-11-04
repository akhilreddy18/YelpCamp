const express = require("express"),
          app = express(),
   bodyParser = require("body-parser"),
         port = 3000,
     mongoose = require("mongoose"),
     Campground = require("./models/campground"),
     Comment   = require("./models/comment"),
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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});   
        }
    })
});

app.post("/campgrounds", function(req,res){

    Campground.create(req.body.campground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })    
});

app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
}); 

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground})
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, createdComment){
                if(err){
                    console.log(err);
                } else {
                foundCampground.comments.push(createdComment);
                foundCampground.save();
                console.log(foundCampground);
                res.redirect("/campgrounds/"+foundCampground._id);
                }
            })
        }
    })

})

  
app.listen(port, function(){
    console.log("Yelpcamp server started at port "+ port);
})
