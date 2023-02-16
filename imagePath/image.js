import multer from "multer";
import Movie from "../models/movie.js";
import *as path from 'path'

// const storage = multer.diskStorage({
//   destination: 'images',
  
//   filename: (req, file, cb) => {
//       cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }

// });

const storage = multer.diskStorage({

    destination: function (req,file,cb) {
        cb(null, 'public/uploads')
    },

    filename: function (req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
      || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf'){
          cb(null, true);
      }else {
          cb(null, false);
      }
}

// // const upload= (multer({storage:storage, fileFilter:filefilter }).fields([{name:'poster'},{name:'identity'}]))

const upload= multer({ storage: storage, filefilter:filefilter})

const multipleUpload = upload.fields([{ name: 'poster'}, { name: 'identity'}])

export default multipleUpload