const mongoose = require("mongoose"),
	Campground = require("./models/campground");
	// Comment    = require("./models/comment");

var data = [
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

function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err)
		} else {
			console.log("removed campgrounds");
			data.forEach(function(seed){
				Campground.create(seed, function(err, createdCampground){
					if(err){
						console.log(err);
					} else {
						console.log("created a campground");
					}
				})
			})
		}
	})
}

module.exports = seedDB;