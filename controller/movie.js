import express from 'express'
import Movie from '../models/movie.js'
import Actor from '../models/actor.js';
import Producer from '../models/producer.js';

const movieController = express.Router();


// CREATE MOVIE(success)
const createMovie = async (req,res) =>{

  try{

    if (!req.file) {
      res.status(401).send({ message: "please select image" });

    }else{

      const { name, yearOfTheRelease, plot, actors, producer } = req.body;
      
    let poster = req.file.path;

const user = new Movie({
         name,yearOfTheRelease,plot,poster,actors,producer    
       });

await user.save();

res.status(200).json({success:true, data: user })
}

  }
  catch(error){
    res.status(400).send(error.message)
  }

  
}


// get all screen movies(success)
const getScreen = async(req,res) =>{

  try {
    const data = await Movie.find({}).select('-plot ')
    .populate('actors',{name : 1,_id : 0}).populate('producer',{name : 1,_id : 0})
  
  res.status(200).json({success: true, Movies:data});
  } catch (error) {
    res.status(400).send(error.message)
    
  }


}



// get movie by id(success)
const getMovie = async (req,res) =>{
    try{
        const _id= req.params.id
    
        const getid= await Movie.findOne({_id})
        .populate('actors',{name : 1,_id : 0})
        .populate('producer',{name : 1,_id : 0})

    
        res.status(200).json({
          status: "Success",
          message: 'Movie fetched.',
          Movie: getid
        })        
      }
        catch(error)
        {
            res.status(400).send(error.message)
        }
}

// update movie(success)
const updateMovie = async (req,res) =>{
    try {

      if (!req.file) {
         res.status(401).send({ message: "please select poster" });
            
          } else{

            const { name, yearOfTheRelease, plot, actors, producer } = req.body;
            
            let poster = req.file.path;
          
        const _id= req.params.id
        
    
        var user = await Movie.findByIdAndUpdate(_id,{
            name,yearOfTheRelease,plot,
            poster,actors,producer,
            new:true 
        }).populate("actors",{name:1})
        user.save()
        
        res.status(200).json({
          status: "Success",
          message: 'Movie updated!',
          Movie:user
        })
      }
        
      } catch (error) {
        res.status(400).send({error:error.message})
      }
    
}



export default {movieController,

    createMovie,getMovie,updateMovie,getScreen
}