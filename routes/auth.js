import express from 'express'
import authController from '../controller/auth.js'



const authRouter = express.Router()


authRouter.post("/api/v1/register",authController.authRegister)

authRouter.post("/api/v1/login",authController.authLogin)



export default authRouter