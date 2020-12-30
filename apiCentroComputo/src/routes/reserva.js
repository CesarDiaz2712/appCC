const express = require('express');
const router = express.Router();


const ReservaFija = require('../models/ReservaFija');
const ReservaM_S = require('../models/ReservaM-S');

router.get('/menuest-reserva', (req, res) =>{
    res.render('viewsestudiante/menu');
});


router.post('/registrar-reserva/new-reserva', async (req, res) =>{
    const {tiporeserv, fechareserv, horainicio, horafin, preguntasalon, solicitante, descripcion, motivo}= req.body;
    const errors=[];

    //let fechaReserva=fechareserv.toISOString().substring(0,10);

    if(!fechareserv){
        errors.push({text:'Por favor responde la encuesta 1'});
    }
    if(!tiporeserv){
        errors.push({text:'Por favor responde la encuesta 2'});
    }
    if(!horainicio){
        errors.push({text:'Por favor responde la encuesta 3'});
    }

    if(errors.length){
        res.render('viewsestudiante/menu',{
            errors,tiporeserv, fechareserv, horainicio, horafin, preguntasalon, solicitante, descripcion
        });
    }else{
        if(tiporeserv=="Momentanea" || tiporeserv=="Sala"){

            const newReservaFija = new ResevaFija({
                tiporeserv, fechareserv, horainicio, horafin, preguntasalon, solicitante, motivo});
            console.log(newReservaFija);
            //await newEncuesta.save();
        }
        if(tiporeserv=="Fija"){

            const newReservaM_S = new ReservaM_S({
                tiporeserv, fechareserv, horainicio, horafin, preguntasalon, solicitante, descripcion});
            console.log(newReservaM_S);
            //await newEncuesta.save();
        }
        
        res.redirect('/menuest-reserva');
    }
});

module.exports = router;