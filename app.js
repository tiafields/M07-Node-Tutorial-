const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');

const app = express();

// middleware
//making the CSS public by using thr public folder 
app.use(express.static('public'));
//more middleware for postman, takes json data and passes a js object 
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://tmfiel02:PasswordforanotherDB!@cluster0.mgrbt1m.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); 
//renders the home.ejs page
app.get('/', (req, res) => res.render('home'));

//renders the smoothies.ejs page 
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

