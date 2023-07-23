//require routes from express then export 

//creating instance of router 
const { Router } = require ('express');

const authController = require('../controllers/authController')
const router = Router();



//attaching request to router 

//send back sign up view 
router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post ('/login', authController.login_post);

router.get ('/logout', authController.logout_get);



module.exports = router;

