require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var choice = function(command, data) {
  switch (command) {
    case `concert-this`:
      break;
    case `spotify-this-song`:
      break;
    case `movie-this`:
      break;
    case `do-what-it-says`:
      break;
    default:
      console.log("wrong command");
  }
};
choice(process.env[2], process.env[3]);
