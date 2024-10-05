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

// returns an user
const getUser = async (req, res) => {

    try {
        // connect to the client
        await client.connect();
    
        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");

        // Query database to fetch an user
        const user = await db.collection("users").findOne({email: req.params.email});

        if(user) {
            res.status(200).json({status: 200, data: user});
        } else {
            res.status(404).json({status: 404, message: "User not found."});
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

module.exports = getUser;