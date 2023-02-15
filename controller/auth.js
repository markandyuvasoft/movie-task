import express from 'express'
import Auth from '../models/auth.js';
import createtoken from '../token/authtoken.js'

const authController = express.Router();

// register user
const authRegister = async (req, res) => {
    const { name,email, password,mobile,gender } = req.body;
  
    if (!name  || !password || !email || !mobile || !gender ) {
      return res.status(422).send({ error: "please fill the field properly" });
    
    } else {
   
  
      const user = new Auth({
        name,email, password,mobile,gender
      });

        const userdatas = await user.save();
  
        res.status(200).send({ message: "User Register Successfully" });
      
    }
};


// login user
const authLogin = async (req, res) =>{
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "please fill the proper field " });
      
    } else {
      let user = await Auth.findOne({ email: req.body.email , password});
  
      if (!user) {
        return res.status(404).send({ error: "invalid details" });
      } 
      else {
 
        const token = await createtoken(user._id);

        let Id = user._id;
  
        res.status(200).send({ success: "😉welcome..!!", token, Id });
      }
    }
} 


export default {authController,
  authRegister,
  authLogin
}