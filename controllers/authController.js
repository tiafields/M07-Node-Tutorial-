 const User = require('../models/User');
 
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
    //sending a response, 201 is sucess 
    res.status(201).json(user)
   }
   //creating an instance of a user and saving it to a database , must match schema from user.js(email and pass)
   catch(err){
    console.log(err);
    res.status(400).send('error, user not created');
   }
 }

 module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send('user login');
    
 }