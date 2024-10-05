"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const login = async (req, res) => {
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
  
    const { email } = req.body;
    const client = new MongoClient(MONGO_URI);
  
    try {
      const db = client.db("mestre_cuca");
      const foundEmail = await db
        .collection("users")
        .findOne({ email: email });
      if (!foundEmail) {
        return res.status(404).json({
          status: 404,
          message: "Unable to find an email: " + email,
        });
      } else {
        res.status(200).json({
          status: 200,
          userDetails: {
            email: foundEmail.email,
            password: foundEmail.password
          },
        });
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

module.exports = login;

  