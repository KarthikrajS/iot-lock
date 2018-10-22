import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        // unique:true
    },
    unit:{
        type:String,
        required:true
    },
    unitNumber:{
        type:String,
        required: true
    },
    itemToken:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    locations:{
        type:String ,
        required: true
    }
},{timestamp:true});

schema.methods.generateItemToken = function generateJWT(){
    return jwt.sign({
        email: this.email,
        itemName: this.itemName,
        unit:this.unit,
        unitNumber: this.unitNumber,
        locations: this.locations
        // confirmed: this.confirmed`
    },process.env.JWT_SECRET)
};

schema.methods.setItemToken = function setItemToken() {
    this.itemToken = this.generateItemToken();
};
schema.methods.setOtherDetails = function setOtherDetails(unit,unitNumber,email,locations) {
    this.unitNumber = unitNumber;
    this.unit = unit;
    this.email = email;
    this.locations = locations;
}
schema.methods.getAllItems = function getAllItems(){

}
// schema.plugin(uniqueValidator,{message:'This device is already available!'});
export default mongoose.model('Item',schema);