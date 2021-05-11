const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');

require('./DB/initDB')

app.use(express.json())
app.use(bodyParser.urlencoded({ 
     extended: true 
}))

app.use(cors())
const corsOptions ={
  origin: "https://p7s0x.csb.app/",
  methods: "GET"
}
const authRoute = require('./routes/auth');
const productRouters = require("./products");
const categoryRouters = require("./category");
const cartRouters = require('./cartItem');
const wishlistRouters = require('./wishlist');

app.use('/api/user',authRoute);
app.use("/products",productRouters);
app.use("/products/category",categoryRouters);
app.use("/cart",cartRouters);
app.use("/wishlist",wishlistRouters);

app.get('/', (req, res) => {
  res.send('Hello')
});


app.listen(3000, () => {
  console.log('server started');
});