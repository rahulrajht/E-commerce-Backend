const express = require("express");
const router = express.Router();

const ProductItem = require("./model/ProductsModel")


router.get("/:name",async(req, res) => {
  const data = await ProductItem.find({category:req.params.name})
  res.json({sucess:true,data})
    
})

module.exports = router