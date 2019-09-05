var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var loginController = require('../controllers/authentication')
var profileController = require('../controllers/profile')


router.get('/profile', auth, profileController.profileRead);


//authencation

router.post('/login', loginController.login)
router.post('/register', loginController.register)


module.exports = router
