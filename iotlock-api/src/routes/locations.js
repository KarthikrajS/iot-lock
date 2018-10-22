import express from 'express';
import parseErrors from "../utils/parseErrors";
import Location from '../models/Location';

const router = express.Router();
router.get('/get_location',(req,res)=> {
Location.find({}).then(locations =>{
  if(locations){
          res.json({locations:locations})
  }else{
      res.status(400).json({errors:{global:"No Locations Found"}})
  }
}).catch(err=> res.status(400).json({errors:parseErrors(err.errors)}))
});

export default router;