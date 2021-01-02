const express = require('express');
const router = express.Router();

import {authJwt} from '../middlewares'
import * as actividadControll from '../controllers/actividad.conttroller'

const Prestamo = require('../models/Prestamo');
//estudiante

router.get('/student/registrar-prestamo', function(req, res){
    res.render('viewsestudiante/menu');
});

//auxtec
router.get('/auxtec/registrar-prestamo', (reg, res) => {
    res.render('viewsauxiliartecnico/registrar-prestamo');
});

router.get('/consultaprestamo', async(req, res) =>{
    const prestamos= await Prestamo.find().sort({date:'desc'});
    res.render('consulta-prestamo', {prestamos});
     });


router.post('/registrar-prestamo/new-prestamo', async (req, res) =>{
        const {fechaPrestamo, experiencia, horario, salon, solicitante, equipo}= req.body;
        const errors=[];
    
        if(!fechaPrestamo){
            errors.push({text:'Por favor responde la encuesta 1'});
        }
        if(!experiencia){
            errors.push({text:'Por favor responde la encuesta 2'});
        }
        if(!horario){
            errors.push({text:'Por favor responde la encuesta 3'});
        }
    
        if(errors.length){
            res.render('viewsauxiliartecnico/registrar-prestamo',{
                errors,fechaPrestamo, experiencia, horario, salon, solicitante, equipo
            });
        }else{
            const newPrestamo = new Prestamo({
                fechaPrestamo, experiencia, horario, salon, solicitante, equipo});
            console.log(newPrestamo);
            await newPrestamo.save();
            res.redirect('/auxtec/registrar-prestamo');
        }
    });

    
router.get('/registro-actividad', (req, res) =>{
    res.render('viewsauxiliartecnico/registrar-actividades');
});

router.post('/registrar-actividad/new-actividad', actividadControll.createActividad);
    
module.exports = router;