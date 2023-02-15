import express from 'express'
import movieController from '../controller/movie.js'
import upload from '../imagePath/image.js'

 import checkauth from '../middleware/auth.js'


const movieRouter = express.Router()


movieRouter.post("/api/v1/createMovie",checkauth,upload,movieController.createMovie)

movieRouter.get("/api/v1/getallMovieList",movieController.getScreen)

movieRouter.get("/api/v1/getMovies/:id",movieController.getMovie)

movieRouter.put("/api/v1/updateMovie/:id",checkauth,upload,movieController.updateMovie)





export default movieRouter