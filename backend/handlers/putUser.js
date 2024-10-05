"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const putUser = async (req, res) => {
    const requiredKey = [
      "email",
      "password"
    ];
  
    if (
      requiredKey.some((key) => {
        if (!req.body[key] || typeof req.body[key] !== "string") {
          res.status(400).json({
            status: 400,
            message: `Error, body must contain a key of ${key}, whose value is a string.`,
          });
          return true
        }
      })
    ) {
      return;
    }
  
    const { email, password } = req.body;
    const client = new MongoClient(MONGO_URI);
  
    try {
      const db = client.db("mestre_cuca");
      const foundId = await db
        .collection("users")
        .findOne({ email: email });

        let userInformationUpdated = 0;
        if (foundId) {
            userInformationUpdated = await db
            .collection("users")
            .updateOne({"_id": foundId._id},
              {$set: {"password": password}}, {new: true}
            );
        }
        console.log(userInformationUpdated);
        // On success/no error, send
        if(userInformationUpdated !== 0) {
          if (userInformationUpdated.modifiedCount !== 0 && userInformationUpdated.matchedCount !== 0) {
            res.status(200).json({ status: 200, message: "User information updated" });
          } else {
            res.status(201).json({ status: 200, message: "User information not updated" });
          }
        } else {
            res.status(404).json({ status: 404, messsage: "User information not found or User information not updated" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    } finally {
      client.close();
    }  
  }

  module.exports = putUser;