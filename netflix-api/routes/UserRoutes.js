const { addToLikedMovies, getLikedMovies, removeFromLikedMovies,
  
      } = require("../controllers/UserController");
  
  const router = require("express").Router();
  
  router.post("/add", addToLikedMovies); // Route expect JSON payload with movie details
  router.get("/liked/:email", getLikedMovies); // Route expect email and return JSON list of movies
  router.put("/delete", removeFromLikedMovies); // Route expect JSON payload containing movie details and remove movie from mylist


  module.exports = router;