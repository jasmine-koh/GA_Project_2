const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const methodOverride = require("method-override");
const recipeController = require("./controllers/apron.js");
const userController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const session = require("express-session");
require("dotenv").config();

// const Recipe = require("./models/recipe.js");

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect("mongodb://localhost:27017/apron", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// controllers
app.use("/apron", recipeController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

app.listen(PORT, () => {
  console.log(`i'm listening...`);
});
