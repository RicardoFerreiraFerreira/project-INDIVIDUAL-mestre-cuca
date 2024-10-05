"use strict";
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const postFavoriteMeal = async (req, res) => {
  const requiredKey = [
    "email",
    "idFavoriteMeal"
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
  
  const { email, idFavoriteMeal } = req.body;
  const client = new MongoClient(MONGO_URI);
  
  try {
    const db = client.db("mestre_cuca");
    const foundEmail = await db
        .collection("users")
        .findOne({ email: email });
        if (foundEmail === null) {
            return res.status(404).json({
                status: 404,
                message: "Email does not exist in the database.",
            });
        }
  
    const foundRecipe = await db
        .collection("recipes")
        .findOne({ _id: idFavoriteMeal });
        console.log("Caquito " + foundRecipe);
        if (foundRecipe === null) {
            return res.status(404).json({
                status: 404,
                message: "Recipe does not exist in the database.",
            });
        }

    const foundFavorite = await db
        .collection("favorites")
        .findOne({ email: email, idFavoriteMeal: idFavoriteMeal });
        console.log(foundFavorite)
        if (foundFavorite) {
            return res.status(404).json({
                status: 404,
                message: "Favorite exists in the database.",
            });
        }

    const newFavoriteMeal = {
      _id: uuidv4(),
      email,
      idFavoriteMeal
    };
  
    const insertedFavoriteMeal = await db
      .collection("favorites")
      .insertOne(newFavoriteMeal);
    if (!insertedFavoriteMeal || !insertedFavoriteMeal.insertedId) {
      res.status(500).json({
        status: 500,
        message: "Mongo error while creating new user.",
      });
    } else {
      res.status(201).json({
        status: 201,
        _id: insertedFavoriteMeal.insertedId,
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

module.exports = postFavoriteMeal;