const express = require("express");
const router = express.Router();

const ProductItem = require("./model/ProductsModel")
const User = require('./model/user')
var ObjectID = require('mongodb').ObjectID;

router.post("/add-to-wishlist",async(req, res) => {

  const _id = new ObjectID(req.body.id);
  const email = req.body.email;

  const product = await ProductItem.find({_id});
  const isEmailExist = await User.findOne({email:email})

  if(isEmailExist) {
    const data = await User.findOneAndUpdate({email:email},{
      $addToSet:{wishlists:product }
    });
    await data.save((err,obj)=>{
      if(err) res.status(400).send("Error");

      res.status(200).send(obj.wishlists[0])
    });
    
  }
    
});
router.post("/remove-item",async(req, res) => {
  const _id = new ObjectID(req.body.id);
  try{
    const data = await User.findOneAndUpdate({email:req.body.email},
    {
      $pull:{wishlists:{_id:_id}}
    })
     res.status(200).send("Removed")
  }
  catch{
    res.status(400).send("Something went wrong.")
  }

 
  
    
});

router.get("/getitems/:email",async(req, res) => {
  const email = req.params.email;
  const isEmailExist = await User.findOne({email:email});
  if(isEmailExist) {
    const data = await User.findOne({email:email});

    res.status(200).send(data.wishlists);
  }
    
})


module.exports = router
