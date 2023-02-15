import mongoose from "mongoose";

var Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    yearOfTheRelease: {
      type: String,
    },
    plot: {
      type: String,
    },
    poster: {
      type: String,
    },
    actorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'actor'
    },
    actors: [{
    // publisher: {
      type: Schema.Types.ObjectId,
      ref: 'actor',
      // required: true
   }],

   producer: {
    // publisher: {
      type: Schema.Types.ObjectId,
      ref: 'producer',
      // required: true
   }

  },
  { versionKey: false }
);

const Movie = mongoose.model("movie", movieSchema);

export default Movie;
