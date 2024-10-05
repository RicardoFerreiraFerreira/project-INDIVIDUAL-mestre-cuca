"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// deletes a favorite meal
const deleteFavoriteMeal = async (req, res) => {
    try {
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
  
        // connect to the client
        await client.connect();
  
        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");
  
        // Query database to fetch favorite meal
        const favoriteMeal = await db.collection("favorites").findOne({_id: req.params.id});
        
        // Delete favorite meal
        let deletedFavoriteMeal = 0;
        if(favoriteMeal) {
            deletedFavoriteMeal = await db.collection("favorites").deleteOne({ _id: favoriteMeal._id });
        }
        
        // close the connection to the database server
        client.close();
        console.log("disconnected!");

        // On success/no error, send
        if(deletedFavoriteMeal !== 0) {
            if(deletedFavoriteMeal.deletedCount !== 0) {
                res.status(200).json({ status: 200, message: "Favorite meal deleted" });
            }
        } else {
            res.status(404).json({ status: 404, messsage: "Favorite meal not found!!!" });
        }

    } catch (err) {
        console.log(err.stack);
        // on failure/error, send
        res.status(500).json({ status: 500, message: err.message });
    }
};

module.exports = deleteFavoriteMeal;
