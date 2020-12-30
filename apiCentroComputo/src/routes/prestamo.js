const express = require('express');
const router = express.Router();


const Encuesta = require('../models/Prestamo');
//estudiante

router.get('/registrar-prestamo', function(req, res){
    res.render('viewsestudiante/menu');
});

//auxtec
router.get('/registrar-prestamo', (reg, res) => {
    res.render('viewsauxiliartecnico/registrar-prestamo');
});

router.get('/consultaprestamo', async(req, res) =>{
    const prestamos= await Prestamo.find().sort({date:'desc'});
    res.render('consulta-prestamo', {prestamos});
     });


router.post('/registrar-prestamo/new-prestamo', async (req, res) =>{
        const {fechaPrestamo, experiencia, horario, preguntasalon, solicitante, equipo}= req.body;
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
                errors,fechaPrestamo, experiencia, horario, preguntasalon, solicitante, equipo
            });
        }else{
            const newEncuesta = new Encuesta({
                fechaPrestamo, experiencia, horario, preguntasalon, solicitante, equipo});
            console.log(newEncuesta);
            await newEncuesta.save();
            res.redirect('/registrar-prestamo');
        }
    });
    
module.exports = router;