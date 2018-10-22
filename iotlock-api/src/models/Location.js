import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    locationId:{
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true,
    }
},{timestamp:true});



// schema.plugin(uniqueValidator,{message:'This device is already available!'});
export default mongoose.model('Location',schema);