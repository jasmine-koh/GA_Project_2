const express = require(`express`);
const router = express.Router();
const Recipe = require("../models/recipe.js");

// ==================== GET ROUTES ====================
// ====== INDEX ======
router.get("/", (req, res) => {
  Recipe.find((error, allRecipe) => {
    if (error) console.log(error);

    res.render("index.ejs", {
      recipe: allRecipe,
      currentUser: req.session.currentUser
    });
  });
});

router.get("/app", (req, res) => {
  Recipe.find((error, allRecipe) => {
    res.render("app/index.ejs", {
      recipe: allRecipe,
      currentUser: req.session.currentUser
    });
  });
});

router.get("/app", (req, res) => {
  if (req.session.currentUser) {
    res.render("app/index.ejs");
  } else {
    res.redirect("/sessions/new");
  }
});

// ====== NEW ======
router.get("/new", (req, res) => {
  res.render("new.ejs", {
    currentUser: req.session.currentUser
  });
});

// ====== EDIT ======
router.get("/:id/edit", (req, res) => {
  Recipe.findById(req.params.id, (error, foundRecipe) => {
    res.render("edit.ejs", {
      recipe: foundRecipe,
      currentUser: req.session.currentUser
    });
  });
});

// ====== SHOW ======
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render(`show.ejs`, {
      recipe: foundRecipe,
      currentUser: req.session.currentUser
    });
  });
});

// ==================== ACTION ROUTES ====================

// ====== CREATE (POST) ======
router.post("/", (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    res.redirect("/apron");
  });
  //   res.send(req.body);
});

// ====== EDIT (PUT) ======
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/apron");
  });
});

module.exports = router;
