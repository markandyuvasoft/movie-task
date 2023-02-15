import mongoose from "mongoose";

var Schema = mongoose.Schema;

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email:{
        type: String, 
    },
    password: {
      type: String,
    },
    mobile:{
        type: String,
    },
    gender:{
        type: String,
    },
    
   
  },
  { versionKey: false }
);

const Auth = mongoose.model("auth", authSchema);

export default Auth;
