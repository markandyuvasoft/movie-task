import express from "express";
import Actor from "../models/actor.js";

const actorController = express.Router();

// create actor
const createActor = async (req, res) => {

  try {
    
  const actors = new Actor(req.body);
  await actors.save();
  res.status(201).json({success:true, actor: actors })

  } catch (error) {
    
    res.status(400).send(error.message)
  }

      
  
  }

  export default {actorController,
    createActor
    
  }