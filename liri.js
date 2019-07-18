require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var lookup = process.argv[3];

switch (command) {
  case `concert`:
    concert(lookup);
    break;
  case `song`:
    song(lookup);
    break;
  case `movie`:
    movie(lookup);
    break;
  default:
    console.log(
      "oops, dont forget to type a command followed by what your looking for \n"
    );
    console.log(
      "for example \n movie ant-man \n song bulletproof \n concert blink-182"
    );
}

function concert(lookup) {
  if (!lookup) {
    lookup = "lil wayne";
  }
  var queryEvents =
    "https://rest.bandsintown.com/artists/" +
    lookup +
    "/events?app_id=f46d2e342f300823cf6471567005b3e0";
  axios.get(queryEvents).then(function(apiInfo) {
    apiInfo.data.forEach(function(event) {
      console.log("##########");
      console.log("Venue Name: " + event.venue.name);
      console.log("Venue Location: " + event.venue.city);
      console.log("Event Date: " + moment(event.datetime).format("MM/DD/YYYY"));
      console.log("##########");
    });
  });
}

function song(lookup) {
  if (!lookup) {
    lookup = "never gonna give you up";
  }
  spotify
    .search({ type: "track", query: lookup })
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        var spotifyResult =
          "---------------------------" +
          "\nArtist(s): " +
          response.tracks.items[i].artists[0].name +
          "\nSong Name: " +
          response.tracks.items[i].name +
          "\nPreview Link: " +
          response.tracks.items[i].preview_url +
          "\nAlbum Name: " +
          response.tracks.items[i].album.name;

        console.log(spotifyResult);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
function movie(lookup) {
  if (!lookup) {
    lookup = "The Lion King";
  }
  axios
    .get(
      "https://www.omdbapi.com/?t=" + lookup + "&y=&plot=short&apikey=423de53a"
    )
    .then(function(response) {
      var movieResult =
        "---------------------------" +
        "\nMovie Title: " +
        response.data.Title +
        "\nYear of Release: " +
        response.data.Year +
        "\nIMDB Rating: " +
        response.data.imdbRating +
        "\nRotten Tomatoes Rating: " +
        response.data.Ratings[1].Value +
        "\nCountry Produced: " +
        response.data.Country +
        "\nLanguage: " +
        response.data.Language +
        "\nPlot: " +
        response.data.Plot +
        "\nActors/Actresses: " +
        response.data.Actors;
      console.log(movieResult);
    })
    .catch(function(error) {
      console.log(error);
    });
}
