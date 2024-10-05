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

// returns countries or categories
const getCountriesCategories = async (req, res) => {

    try {
        // connect to the client
        await client.connect();
    
        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");

        // Query database to fetch countries or categories
        const  countriesCategories = await db.collection("countriesCategories").find({type: String(req.params.type)}).toArray();

        if(countriesCategories.length !== 0) {
            res.status(200).json({status: 200, data: countriesCategories});
        } else {
            res.status(404).json({status: 404, message: "Countries or categories not found."});
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

module.exports = getCountriesCategories;