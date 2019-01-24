
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
//var moment = reqiure("moment");
var axios = require("axios");
var fs = require("fs");



var typeOfSearch = process.argv[2];
var search = process.argv[3];




switch (typeOfSearch) {
    case 'concert-this':
        bandsInTown()
        break;

    case 'spotify-this-song':
        searchSpotify(search)
        break;

    case 'movie-this':
        //find movie
        break;

    case 'do-what-it-says':
        //do something
        break;
}

var spotify = new Spotify({
    id: "03782b49b94a4b00905d16afa43dcdb2",
    secret: "1c8c7a263eb54911a92dbd336c657333"
});


function searchSpotify(song) {


    if (song) {
        spotify
            .search({ type: 'track', query: song })
            .then(function (data) {
                console.log('Artist: ' + data.tracks.items[0].artists[0].name);
                console.log('Song: ' + data.tracks.items[0].name);
                console.log('Preview Link: ' + data.tracks.items[0].preview_url);
                console.log('Album: ' + data.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    else
        spotify
            .search({ type: 'track', query: 'Ace The Sign' })
            .then(function (data) {

                console.log('Artist: ' + data.tracks.items[0].artists[0].name);
                console.log('Song: ' + data.tracks.items[0].name);
                console.log('Preview Link: ' + data.tracks.items[0].preview_url);
                console.log('Album: ' + data.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });

};