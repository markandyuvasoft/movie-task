import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types

var Schema = mongoose.Schema;

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    bio: {
      type: String,
    },
    // createdby:{
    //   type:ObjectId,
    //   ref:"auth"
    //   },

      movieId: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
     }]
  },
  { versionKey: false }
);


actorSchema.virtual('movies', {
  ref: 'movie', 
  localField: '_id', 
  // foreignField: 'publisher', 
  foreignField: 'actid', 

});

const Actor = mongoose.model("actor", actorSchema);

export default Actor;
