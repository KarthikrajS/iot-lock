import express from 'express';
import Device from '../models/Device';
import parseErrors from "../utils/parseErrors";


const router = express.Router();


router.post('/add_device',(req,res)=>{

   const {deviceId,accessToken,locations} = req.body.data;
   const device = new Device({deviceId});
   device.setDetails(accessToken,locations);
   device.save().then(deviceRecord =>{
      res.json({success:deviceId+" is added successfully!"})
   }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
});

export default router;
