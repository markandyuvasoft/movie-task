import express from 'express'
import producerController from '../controller/producer.js'
import checkauth from '../middleware/auth.js'
import adduservali from '../validation/authValidation.js'


const producerRouter = express.Router()


producerRouter.post("/api/v1/createProducer",adduservali,checkauth,producerController.createProducer)




export default producerRouter