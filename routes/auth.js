const router = require('express').Router();
const User = require('../model/user');
const {registerValidation ,loginValidation} = require('../validation');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
  //Validation
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //checking if user already exists
  const isEmailExist = await User.findOne({email:req.body.email})
  if(isEmailExist) return res.status(400).send('Email already exists')

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password , salt);

  // creating a new user
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword
  });

  try{
      const savedUser = await user.save();
      res.send({user:savedUser});
  } catch(err){
      res.status(400).send(err);
  }


})

router.post('/login', async (req,res)=>{
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //checking if user already exists
  const user = await User.findOne({email:req.body.email})
  if(!user) return res.status(400).send('Email does not exists')

  //Password is correct 
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid password')

  // Create and assign a token
  const token = jwt.sign({_id:user._id,email:user.email},process.env['TOKEN_SECRET']);
  res.header('auth-token',token).send({token:token,email:user.email,name:user.name})

})

module.exports = router;
