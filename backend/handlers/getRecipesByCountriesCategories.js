"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// creates a new client
const client = new MongoClient(MONGO_URI, options);

// returns recipes by countries or categories
const getRecipesByCountriesCategories = async (req, res) => {

    try {
        // connect to the client
        await client.connect();
    
        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");

        // Query database to fetch countries or categories
        console.log(String(req.params.recipesByCountriesCategories))
        const recipesByCountriesCategories = await db.collection("recipesByCountriesCategories").find({strAreaCategory: String(req.params.recipesByCountriesCategories)}).toArray();

        if(recipesByCountriesCategories.length !== 0) {
            res.status(200).json({status: 200, data: recipesByCountriesCategories});
        } else {
            res.status(404).json({status: 404, message: "Recipes by countries or categories not found."});
        }
    
    } catch(error) {
        console.error(error);
        res.status(500).json({
          status: 500,
          message: error.message,
        });
    } finally {
        // close the connection to the database server
        console.log("disconnected");
        client.close();    
    }
}

module.exports = getRecipesByCountriesCategories;