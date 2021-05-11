const express = require("express");
const router = express.Router();

const ProductItem = require("./model/ProductsModel")



router.get("/",async(req, res) => {
  const data = await ProductItem.find({})
  res.json({sucess:true,data})
    
})

router.post("/",async function (req,res){
  try{
    for(var i=0; i<req.body.length; i++){
      const Item = new ProductItem(req.body[i]);
      await Item.save();      
    }    
    res.json({sucess:true , message:"data stored successfully in databse"});
   
  }
  catch(err){
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router