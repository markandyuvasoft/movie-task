import express from 'express'
import movieController from '../controller/movie.js'

import multipleUpload from '../imagePath/image.js'
 import checkauth from '../middleware/auth.js'


const movieRouter = express.Router()


movieRouter.post("/api/v1/createMovie",checkauth,multipleUpload,movieController.createMovie)

movieRouter.get("/api/v1/getallMovieList",movieController.getScreen)

movieRouter.get("/api/v1/getMovies/:id",movieController.getMovie)

movieRouter.put("/api/v1/updateMovie/:id",checkauth,multipleUpload,movieController.updateMovie)





export default movieRouter