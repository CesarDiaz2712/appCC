const express = require('express');
const router = express.Router();
const path = require('path');

const Usuario = require('../models/Usuario');

router.get('/users/signup', (req, res) =>{
    res.render('users/signup');
});

router.get('/users/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/users/login.html'));
});

router.post('/users/signup', async (req, res) => {
    const {nombre, apellidos, matricula, correo, usuario, password, confirm_password}= req.body;
    const errors= [];

    if(nombre.length <= 0){
        errors.push({text: 'Ingrese el campo nombre'});
    }
    if(apellidos.length <= 0){
        errors.push({text: 'Ingrese el campo apellidos'});
    }
    if(correo.length <= 0){
        errors.push({text: 'Ingrese el campo correo'});
    }
    if(usuario.length <= 0){
        errors.push({text: 'Ingrese el campo usuario'});
    }
    if(password.length <= 0){
        errors.push({text: 'Ingrese el campo contraseña'});
    }
    if(confirm_password.length <= 0){
        errors.push({text: 'Ingrese el campo confirmar contraseña'});
    }
    if(password != confirm_password){
        errors.push({text: 'No coinciden las contraseñas'});
    }
    if(password.length < 4){
        errors.push({text: 'Contraseña menor a 4 digitos'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, nombre, apellidos, matricula, correo, usuario, password, confirm_password});
    }else{
        const user_email = await Usuario.findOne({correo: correo});
        if(user_email){
            req.flash('error_msg', 'Correo ya registrado');
            res.redirect('/users/login');
        }

        const newUsuario = new Usuario({nombre, apellidos, matricula, correo, usuario, password});
        newUsuario.password = await newUsuario.encryptPassword(password);
        await newUsuario.save();
        req.flash('success_msg', 'Usuario registrado');
        res.redirect('/users/login');
    }
});


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