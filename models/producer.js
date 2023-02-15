import mongoose from "mongoose";
const {ObjectId}= mongoose.Schema.Types

var Schema = mongoose.Schema;

const producerSchema = new mongoose.Schema(
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
    createdby:{
      type:ObjectId,
      ref:"auth"
      },
      movieId: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
     }]
  },
  { versionKey: false }
);


producerSchema.virtual('movies', {
  ref: 'movie', 
  localField: '_id', 
  // foreignField: 'publisher', 
  foreignField: 'producedId', 

});



const Producer = mongoose.model("producer", producerSchema);

export default Producer;
