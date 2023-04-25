// Using express to handle HTTP requests and mongoose library to interact with the MongoDB database
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();

//  CORS - Allow web applications on different domains to access resources from each other domains
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://ivangeljic:123456ivan@ivancluster.fihxdgv.mongodb.net/netflix", {
    useNewUrlParser: true, // For MongDB Cluster and new version of MongDB
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes); // For express

app.listen(5000, () => {
  console.log("server started on port 5000");
});