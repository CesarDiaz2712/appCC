import {Router} from 'express'
import passport from 'passport';
const router= Router();
const path = require('path');

import * as auth from '../controllers/AuthController'


router.get('/signup', (req, res) =>{
    res.render('users/signup');
});

router.get('/signin', (req, res) =>{
    res.sendFile(path.join(__dirname + '/../views/users/login.html'));
});

router.post('/signin',auth.signin)

router.post('/signup', auth.signup)

export default router;