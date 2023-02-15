import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import authRouter from './routes/auth.js'
import movieRouter from './routes/movie.js'
import actorRouter from './routes/actor.js'
import producerRouter from "./routes/producer.js";


dotenv.config()
const app=express();


// midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())

mongoose.set('strictQuery',true);

// routes
app.use("/",authRouter)
app.use("/",movieRouter)
app.use("/",actorRouter)
app.use("/",producerRouter)


app.use('/images', express.static('images'));


const PORT=process.env.PORT||8000
// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})

// server port
app.listen(PORT,()=>{
    console.log("server started at port http://localhost:8000");
})