const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const divisers = require("./data/divisers.json");
const countriesCategories = require("./data/countriesCategories.json");
const recipesByCountriesCategories = require("./data/recipesByCountriesCategories.json");
const recipes = require("./data/recipes.json");

const batchImport = async () => {
    try {
        // creates a new client
        client = new MongoClient(MONGO_URI);

        // connect to the client
        await client.connect();

        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");
              
        // Add recipe divisers in the database
        await db.collection("divisers").insertMany(divisers);

        // Add countries and categories
        await db.collection("countriesCategories").insertMany(countriesCategories);

        // Create collection users
        await db.createCollection("users");

        // Add recipes by countries and categories
        await db.collection("recipesByCountriesCategories").insertMany(recipesByCountriesCategories);

        // Add recipes
        await db.collection("recipes").insertMany(recipes);

        // Create collection favorites
        await db.createCollection("favorites");

    } catch(err) {
        // on failure/error, send
        console.log(err.stack);
    }

    finally {
        // Disconnect to the database
        await client.close();
        console.log("disconnected!");
    }

}

batchImport();