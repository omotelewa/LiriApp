
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//var moment = reqiure("moment");
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
        DoWhatItSays();
        break;
    }
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
