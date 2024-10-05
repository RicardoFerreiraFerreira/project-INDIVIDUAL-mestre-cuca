"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an array of all items
const getRecipeDivisers = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);

    // connect to the client
    await client.connect();

    // connect to the database
    const db = client.db("mestre_cuca");
    console.log("connected!");

    // Create array of recipe Divisers details
    let recipeDivisersDetails = [];
    const recipeDivisers = await db.collection("divisers").find().toArray();
    recipeDivisers.forEach(recipeDiviser => {
        recipeDivisersDetails.push(recipeDiviser);
 
    })

    // close the connection to the database server
    client.close();
    console.log("disconnected!");

    if(recipeDivisersDetails.length === 0) {
        res.status(404).json({status: 404, message: "No recipe divisers found"});
    } else {
        res.status(200).json({status: 200, data: recipeDivisersDetails});
    }
};

module.exports = getRecipeDivisers;
