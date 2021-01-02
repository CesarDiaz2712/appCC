const express = require('express');
const router = express.Router();
const path = require('path');

const Usuario = require('../models/Usuario');
const passport= require('passport');


router.get('/users/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/users/login.html'));
});

/*
router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});
*/
/*
router.post('/users/signup', async (req, res) => {
});
*/

router.get('/menustudent', function(req, res){
    res.render('viewsestudiante/menu');
});


router.get('/menuacadem', function(req, res){
    res.render('viewsacademico/mantenimiento');
});

router.get('/menuauxtec', function(req, res){
    res.render('viewsauxiliartecnico/menu');
});

module.exports = router;