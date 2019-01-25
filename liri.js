
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

// var typeOfSearch = process.argv[2];
// var search = process.argv[3];

App(process.argv[2], process.argv[3])

function App(command, params) {
    
    switch (command) {
        case 'concert-this':
        bandsInTown(params);
        break;

        case 'spotify-this-song':
        searchSpotify(params);
        break;
        
    case 'movie-this':
        getMovie(params);
        break;
        
        case 'do-what-it-says':
        doWhatItSays();
        break;
    }
}
   
function bandsInTown(params) {

    params ? "" : params = "Backstreet Boys";

    var queryURL = `https://rest.bandsintown.com/artists/${params}/events?app_id=codingbootcamp`;

    axios.get(queryURL)
    .then(function (response) {
        var data = response.data;

        console.log('-----------------------------------------------');
        console.log(`Here are the concerts for ${params}:`)

        for (let i = 0; i < data.length; i++) {
            console.log('-----------------------------------------------');
            console.log("Name: ",data[i].venue.name);
            console.log("City: ",data[i].venue.city);
            console.log("Country: ",data[i].venue.country);
            console.log("Date: ",moment(data[i].datetime, "YYYY-MM-DD").format("DD/MM/YYYY"));
            console.log('-----------------------------------------------');
        }

    })
    .catch(function (error) {
        console.log(error);
    })



}



function searchSpotify(song) {

    if (song === undefined || song === " ") {
        song = "hello"
    }

        spotify
            .search({ type: 'track', query: song })
            .then(function (data) {
                // console.log(JSON.stringify(data.tracks.items, null, 2));
                for (let i = 0; i < data.tracks.items.length; i++) {
                    console.log('Artist: ' + data.tracks.items[i].artists[0].name);
                    console.log('Song: ' + data.tracks.items[i].name);
                    console.log('Preview Link: ' + data.tracks.items[i].preview_url);
                    console.log('Album: ' + data.tracks.items[i].album.name);
                    console.log("=========================================")
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    function getMovie(params){

        params ? "" : params = "The Matrix";

        const queryURL = `http://www.omdbapi.com/?t=${params}&y=&plot=short&apikey=trilogy`;

        axios.get(queryURL)
        .then(function (response) {
            var data = response.data;
    
            console.log('-----------------------------------------------');
            console.log("Title: " + data.Title);
			console.log("Year: " + data.Year);
			console.log("Rated: " + data.Rated);
			console.log("IMDB Rating: " + data.imdbRating);
			console.log("Country: " + data.Country);
			console.log("Language: " + data.Language);
			console.log("Plot: " + data.Plot);
			console.log("Actors: " + data.Actors);
			!data.Ratings[1] ? "" : console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
			console.log("------------------------------------------------------------------");
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if(error) {
                return console.log(error);
            };

            var dataArr = data.split(",");

            for (let i = 0; i < dataArr.length; i++) {
                App(dataArr[i], dataArr[i+1]);
            }
        })
    }
