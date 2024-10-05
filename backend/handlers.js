const getRecipeDivisers = require("./handlers/getRecipeDivisers");
const getCountriesCategories = require("./handlers/getCountriesCategories");
const getUser = require("./handlers/getUser");
const postUser = require("./handlers/postUser");
const putUser = require("./handlers/putUser");
const deleteUser = require("./handlers/deleteUser");
const login = require("./handlers/login");
const getRecipesByCountriesCategories = require("./handlers/getRecipesByCountriesCategories");
const getRecipe = require("./handlers/getRecipe");
const getRecipes = require("./handlers/getRecipes");
const postFavoriteMeal = require("./handlers/postFavoriteMeal");
const getFavoritesByEmail = require("./handlers/getFavoritesByEmail");
const deleteFavoriteMeal = require("./handlers/deleteFavoriteMeal");

module.exports = {
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
};
