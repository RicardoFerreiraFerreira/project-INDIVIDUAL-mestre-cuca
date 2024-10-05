"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// deletes a user
const deleteUser = async (req, res) => {
    try {
        // creates a new client
        const client = new MongoClient(MONGO_URI, options);
  
        // connect to the client
        await client.connect();
  
        // connect to the database
        const db = client.db("mestre_cuca");
        console.log("connected!");
  
        // Query database to fetch user
        const user = await db.collection("users").findOne({email: req.params.email});
            
        // Delete a user
        let deletedUser = 0;
        if(user) {
            deletedUser = await db.collection("users").deleteOne({ _id: user._id });
        }

        // Query database to fetch favorite user
        const favoriteUserByEmail = await db.collection("favorites").findOne({email: req.params.email});
        console.log(favoriteUserByEmail)
        
        // Delete faorite user by email
        let deletedFavoriteUserByEmail = 0;
        if(favoriteUserByEmail) {
            deletedFavoriteUserByEmail = await db.collection("favorites").deleteMany({ email: favoriteUserByEmail.email });
        }
        
        // close the connection to the database server
        client.close();
        console.log("disconnected!");

        // On success/no error, send
        if(deletedUser !== 0 || deletedFavoriteUserByEmail !== 0) {
            if(deletedUser.deletedCount !== 0 || deletedFavoriteUserByEmail.deletedCount !== 0) {
                res.status(200).json({ status: 200, message: "User deleted" });
            }
        } else {
            res.status(404).json({ status: 404, messsage: "User not found!!!" });
        }

    } catch (err) {
        console.log(err.stack);
        // on failure/error, send
        res.status(500).json({ status: 500, message: err.message });
    }
};

module.exports = deleteUser;
