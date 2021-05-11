const express = require("express");
const router = express.Router();

const ProductItem = require("./model/ProductsModel")
const User = require('./model/user')
var ObjectID = require('mongodb').ObjectID;

router.post("/add-to-cart",async(req, res) => {

  const id = req.body.id;
  const email = req.body.email;

  const product = await ProductItem.find({_id:id});
 
  const isEmailExist = await User.findOne({email:email})

  if(isEmailExist) {
    const data = await User.findOneAndUpdate({email:email},{
      $addToSet:{carts:product }
    });
    await data.save((err,obj)=>{
      if(err) res.status(400).send("Error");
      if(req.body.isTrue) return res.redirect(307,'/wishlist/remove-item')
      res.status(200).send(obj.carts[0])
    });
    
  }
    
});
router.post("/remove-item",async(req, res) => {
  const _id = new ObjectID(req.body.id);
  try{
    const data = await User.findOneAndUpdate({email:req.body.email},
    {
      $pull:{carts:{_id:_id}}
    })
     res.status(200).send("Removed")
  }
  catch{
    res.status(400).send("Something went wrong.")
  }

 
  
    
});
router.get("/getitems/:email",async(req, res) => {
  const email = req.params.email;

  const isEmailExist = await User.findOne({email:email})

  if(isEmailExist) {
    const data = await User.findOne({email:email});

    res.status(200).send(data.carts);
  }
    
})
router.post("/incQty",async(req, res) => {
  const id = new ObjectID(req.body.id);
  const value = req.body.value;
  const qty = req.body.qty;

  if(qty===1 && value === -1)
    return res.redirect(307,'/cart/remove-item');    
  
  const items = await User.findOneAndUpdate({'carts._id':id},{
    $inc:{'carts.$.count':value}
  },{new: true})

  await items.save((err,obj)=>{
      if(err) res.status(400).send("Error");
      res.status(200).send("Operation succesfull.")
    })      
    
})

module.exports = router
