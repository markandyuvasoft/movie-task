import express from "express";
import Producer from "../models/producer.js";

const producerController = express.Router();


const createProducer = async (req, res, next) => {

  try {
    
  const producers = new Producer(req.body);
  await producers.save();
  res.status(201).json({success:true, producer: producers });

  } catch (error) {
    res.status(400).send(error.message)
    
  }

      
  
  }
  export default {producerController,
    createProducer
    
  }