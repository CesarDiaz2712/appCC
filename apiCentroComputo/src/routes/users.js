const express = require('express');
const router = express.Router();

router.get('/signin', (req, res) =>{
    res.render('users/signin');
});

router.get('/signup', (req, res) =>{
    res.render('users/signin');
});

module.exports = router;