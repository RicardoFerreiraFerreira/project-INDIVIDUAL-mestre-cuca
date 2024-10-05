"use strict";

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 4000;

const {
    getRecipeDivisers,
    getCountriesCategories,
    getUser,
    postUser,
    putUser,
    deleteUser,
    login,
    getRecipesByCountriesCategories,
    getRecipe,
    getRecipes,
    postFavoriteMeal,
    getFavoritesByEmail,
    deleteFavoriteMeal
  } = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  .get("/api/getRecipeDivisers", getRecipeDivisers)
  .get("/api/getCountriesCategories/:type", getCountriesCategories)
  .get("/api/getUser/:email", getUser)
  .post("/api/postUser", postUser)
  .put("/api/putUser", putUser)
  .delete("/api/deleteUser/:email", deleteUser)
  .post("/api/login",login)
  .get("/api/getRecipesByCountriesCategories/:recipesByCountriesCategories", getRecipesByCountriesCategories)
  .get("/api/getRecipe/:id", getRecipe)
  .get("/api/getRecipes", getRecipes)
  .post("/api/postFavoriteMeal", postFavoriteMeal)
  .get("/api/getFavoritesByEmail/:email", getFavoritesByEmail)
  .delete("/api/deleteFavoriteMeal/:id", deleteFavoriteMeal)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
