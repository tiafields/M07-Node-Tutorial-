 const User = require('../models/User');
 const jwt = require('jsonwebtoken');
 //handle errors
 const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'that email is not registered';
    }

   //incorrect password
   if (err.message === 'incorrect password') {
      errors.email = 'that password is not registered';
    }

    //duplicate email error 

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    //validation errors 

    
    if (err.message.includes ('user valitidation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    } 
    return errors; 
}
const maxAge = 3 *24 *60 *60; 
const createToken = (id) => {
   return jwt.sign({id}, 'net ninja secret', {
      expiresIn: maxAge
   });
}

 //creating functions for authRoutes.js, import them into authRoutes.js 

 module.exports.signup_get = (req, res) => {
    res.render('signup');
 }

 module.exports.login_get = (req, res) => {
    res.render('login');
 }

 module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    
   try{
    const user = await User.create({email, password});
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
    //sending a response, 201 is sucess 
    res.status(201).json({user: user._id});
   }
   //creating an instance of a user and saving it to a database , must match schema from user.js(email and pass)
   catch(err){
    const errors = handleErrors(err);
    res.status(400).json({errors}); 
   }
 }

 module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
      //res status(200).json({user: user._id});

    }
    catch (err){
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
 }

 module.exports.logout_get = (req,res) => {
   res.cookie('jwt', '', {maxAge:1})
   res.redirect('/');
 }