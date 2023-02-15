import express from 'express'
import jwt from 'jsonwebtoken'
import Actor from '../models/actor.js'


const createtoken = async (id, res) => {

    try {
  
  
      const tokn = await jwt.sign({ _id: id }, process.env.JWT_SECRET, {
  
        expiresIn: "24h"
      })
  
      return tokn
  
    } catch (error) {
  
      // res.send(error.message)
      console.log(error.message);
    }
  }

  export default createtoken