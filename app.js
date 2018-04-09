var express = require("express");
var app = express();
app.set("view engine", "ejs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.render("landing");
});

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Mountain Goat", image: "https://farm9.staticflickr.com/8041/7930230882_0bb80ca452.jpg"}
    ];

app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampgroound= {name: name, image: image}
    campgrounds.push(newCampgroound);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
})






app.listen(3000, function(){
    console.log("Yelpcamp server started");
})
