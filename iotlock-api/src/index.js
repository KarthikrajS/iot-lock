import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import users from './routes/users';
import devices from './routes/devices';
import items from './routes/items';
import locations from './routes/locations';
import cart from './routes/cart';

import dotenv from 'dotenv';
import Promise from 'bluebird';


dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL,{useMongoClient: true});

app.use("/api/auth",auth);
app.use('/api/users',users);
app.use('/api/devices',devices);
app.use('/api/items',items);
app.use('/api/locations',locations);
app.use('/api/cart',cart);

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(8082,()=>console.log('Running on 8082'));