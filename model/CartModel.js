const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  products:[{
        productId: Schema.Types.ObjectId,
        quantity: Number,
      }]
  });
  
 module.exports = mongoose.model('CartItem',CartSchema) 