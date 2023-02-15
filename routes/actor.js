import express from 'express'
import actorController from '../controller/actor.js'
import checkauth from '../middleware/auth.js'
import adduservali from '../validation/authValidation.js'

const actorRouter = express.Router()


actorRouter.post("/api/v1/createActor",adduservali,checkauth,actorController.createActor)




export default actorRouter
