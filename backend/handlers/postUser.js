"use strict";
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const postUser = async (req, res) => {
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
    const foundEmail = await db
      .collection("users")
      .findOne({ email: email });
    if (foundEmail) {
      return res.status(404).json({
        status: 404,
        message: "Email exists in the database.",
      });
    }
  
    const newUser = {
      _id: uuidv4(),
      email,
      password
    };
  
    const insertedUser = await db
      .collection("users")
      .insertOne(newUser);
    if (!insertedUser || !insertedUser.insertedId) {
      res.status(500).json({
        status: 500,
        message: "Mongo error while creating new user.",
      });
    } else {
      res.status(201).json({
        status: 201,
        _id: insertedUser.insertedId,
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

module.exports = postUser;