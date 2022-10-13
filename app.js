require('dotenv').config();

const express = require('express');
const hbs = require('hbs');


// require spotify-web-api-node package here:
const SpotifyWebApi=require("spotify-web-api-node");

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId:  "c0b744696878458e82a21b47d7bece7b",//process.env.CLIENT_ID,
    clientSecret: "10c13e45cf104a7296d8679a4172b2a1",//process.env.CLIENT_SECRET
  });
spotifyApi
.clientCredentialsGrant()
.then(data => spotifyApi.setAccessToken(data.body['access_token']))
.catch(error => console.log('Something went wrong when retrieving an access token', error));  
// Our routes go here:

app.get("/", (req,res,next)=>{
    res.render("index") // el pots ficar en layout.hbs
})

app.get("/artist-search", (req, res, next) => {
  // console.log("req.query: ", req.query)
  spotifyApi.searchArtists(req.query.artist)
  .then(resultats =>  {
           console.log('Nom artista', resultats.body.artists.items[1].name);
           console.log('Artist albums', resultats.body.artists.items); // aquest es el que volem
           //console.log('Length arr: ', resultats.body.artists.items.length)
          //console.log('resultats: ', resultats)
         
          const data = {artista:resultats.body.artists.items};
          // if(resultats.body.artists.items.length > 0) {
          //     data.artista = resultats.body.artists.items;
          // }
          res.render("artist-search", data);
      },
      function(err) {
        console.error("err: ", err);
      }
    );
})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));


