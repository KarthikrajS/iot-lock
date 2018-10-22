import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
   deviceId:{
       type:String,
       required:true,
       unique:true
   },
   accessToken:{
       type:String,
       required:true
   },
    locations:{
       type:String,
       required: true
    }
},{timestamp:true});

schema.methods.setDetails = function setDetails(accessToken,locations) {
    this.accessToken = accessToken;
    this.locations = locations;
};

schema.plugin(uniqueValidator,{message:'This device is already available!'});
export default mongoose.model('Device',schema);