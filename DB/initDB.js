const mongoose = require('mongoose');

const initDB = mongoose.connect(process.env['DB_CONNECTION'], {useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false,
useCreateIndex: true,
useUnifiedTopology:true})
.then(()=> console.log("connected"))
.catch(err => console.log(err))

module.exports = initDB