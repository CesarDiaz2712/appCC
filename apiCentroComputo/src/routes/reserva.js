import { Router } from "express";
const router = Router();
const express = require('express');


const ReservaFija = require('../models/ReservaFija');
const ReservaM_S = require('../models/ReservaM-S');

router.get('/menu-auxtec-reserva', (req, res) =>{
    res.render('viewsauxiliartecnico/menu');
});


router.post('/registrar-reserva/new-reserva', async (req, res) =>{
    const {tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion, motivo}= req.body;
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
        res.render('viewsauxiliartecnico/menu',{
            errors,tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion
        });
    }else{
        if(tiporeserv=="Momentanea" || tiporeserv=="Sala"){

            const newReservaM_S = new ReservaM_S({
                tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, motivo});
            console.log(newReservaM_S);
            await newReservaM_S.save();
        }
        if(tiporeserv=="Fija"){

            const newReservaFija  = new ReservaFija ({
                tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion});
            console.log(newReservaFija);
            await newReservaFija.save();
        }
        
        res.redirect('/menu-auxtec-reserva');
    }
});



module.exports = router;