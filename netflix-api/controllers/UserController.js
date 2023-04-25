const User = require("../models/UserModel");

// Return list of liked movies by user email in DB
module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } 
    else return res.json({ msg: "User email not found " });
  } catch (error) {
      return res.json({ msg: "Error fetching movies!" });
  } 
};

// Adds a movie to a user list
// If the movie is already in the list, it returns an error message(just for me)!
// If the user is not found, it creates a new user and adds the movie to the list
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } 
      else return res.json({ msg: "Movie already added to the list." });
    } 
    else await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movie successfully added to list." });
  } 
  catch (error) {
    return res.json({ msg: "Error adding movie to the list" });
  }
};

// Remove movie from a user list 
module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId)
      if (movieIndex === undefined) res.status(400).send({msg:"Movie not found"})
      likedMovies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies,
          },
          { new: true }
        );
        return res.json({msg:"Movie Deleted", movies: likedMovies});
    }
  } catch (error) {
    return res.json({ msg: "Error deleting movie" });
  }
};