import express from 'express';
import parseErrors from "../utils/parseErrors";
import Item from "../models/Item";


const router = express.Router();
router.post('/add_item',(req,res)=>{
    // console.log(req.body);
    const {itemName,unit,unitNumber,email,locations } = req.body.data;
    const item = new Item({itemName});
    item.setOtherDetails(unit,unitNumber,email,locations);
    item.setItemToken();
    item.save().then(() =>{
        res.json({result:item.itemToken})
    }).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
    });

router.get('/get_items',(req,res)=>{
    console.log(req.body);
    Item.find({}).then(items=>{
        if(items){
            res.json({items:items})
        }
        else{
            res.status(400).json({global:{errors:"No Itenms Found"}});
        }
    })
})


export default router;