import express from "express";
import Movie from "../models/movie.js";
import Actor from "../models/actor.js";
import Producer from "../models/producer.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const movieController = express.Router();

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// CREATE MOVIE(success)

const createMovie = async (req, res) => {
  try {
    if (!req.files) {
      res.status(401).send({ message: "please select image" });
    
    } else {
      const { name, yearOfTheRelease, plot, actors, producer } = req.body;

      //  const {poster,identity} = req.files
      const poster = req.files["poster"][0].path;

      const identity = req.files["identity"][0].path;

      // let identity

      const result = await cloudinary.uploader.upload(poster);
      const results = await cloudinary.uploader.upload(identity);

      const user = new Movie({
        name,
        yearOfTheRelease,
        plot,
        // poster,
        poster: result.secure_url,
        identity: results.secure_url,
        actors,
        producer,
      });

      await user.save();

      res.status(200).json({ success: true, data: user });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all screen movies(success)
const getScreen = async (req, res) => {
  try {
    const data = await Movie.find({})
      .select("-plot ")
      .populate("actors", { name: 1, _id: 0 })
      .populate("producer", { name: 1, _id: 0 });

    res.status(200).json({ success: true, Movies: data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get movie by id(success)
const getMovie = async (req, res) => {
  try {
    const _id = req.params.id;

    const getid = await Movie.findOne({ _id })
      .populate("actors", { name: 1, _id: 0 })
      .populate("producer", { name: 1, _id: 0 });

    res.status(200).json({
      status: "Success",
      message: "Movie fetched.",
      Movie: getid,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update movie(success)
const updateMovie = async (req, res) => {
  try {
    if (!req.file) {
      res.status(401).send({ message: "please select poster" });
    } else {
      const { name, yearOfTheRelease, plot, actors, producer } = req.body;

      let poster = req.file.path;
      const _id = req.params.id;
      let users = await Movie.findById(req.params.id);
      const dis = await cloudinary.uploader.destroy(poster);

      let result;
      if (dis) {
        result = await cloudinary.uploader.upload(poster);
      }

      var user = await Movie.findByIdAndUpdate(
        _id,
        {
          name,
          yearOfTheRelease,
          plot,
          poster: result?.secure_url,
          actors,
          producer,
        },
        { new: true }
      ).populate("actors", { name: 1 });
      user.save();

      res.status(200).json({
        status: "Success",
        message: "Movie updated!",
        Movie: user,
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export default {
  movieController,

  createMovie,
  getMovie,
  updateMovie,
  getScreen,
};
