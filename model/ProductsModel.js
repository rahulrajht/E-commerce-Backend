const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
   title:String,
   price:Number,
   description:String,
   category:String,
   image:String,
   count:Number,
   inStock:Boolean,
   fastDelivery:Boolean,
   ratings:Number,
   discount:Number
  });
  
 module.exports = mongoose.model('ProductItem',ProductSchema) 