const express = require(`express`);
const app = express();
const mongoose = require(`mongoose`);
const methodOverride = require("method-override");

const Recipe = require("./models/recipe.js");

const PORT = 3000;

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

// ==================== GET ROUTES ====================

// ====== INDEX ======
app.get("/apron", (req, res) => {
  Recipe.find((error, allRecipe) => {
    res.render("index.ejs", {
      recipe: allRecipe
    });
  });
});

// ====== NEW ======
app.get("/apron/new", (req, res) => {
  res.render(`new.ejs`);
});

// ====== EDIT ======
app.get("/apron/:id/edit", (req, res) => {
  Recipe.findById(req.params.id, (error, foundRecipe) => {
    res.render("edit.ejs", {
      recipe: foundRecipe
    });
  });
});

// ====== SHOW ======
app.get("/apron/:id", (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render(`show.ejs`, {
      recipe: foundRecipe
    });
  });
});

// ==================== ACTION ROUTES ====================

// ====== CREATE (POST) ======
app.post("/apron", (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    res.redirect("/apron");
  });
  //   res.send(req.body);
});

// ====== EDIT (PUT) ======
app.put("/apron/:id", (req, res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      res.redirect(`/apron/${req.params.id}`);
    }
  );
});

// ====== DELETE ======
app.delete("/apron/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/apron");
  });
});

app.listen(PORT, () => {
  console.log(`i'm listening...`);
});
