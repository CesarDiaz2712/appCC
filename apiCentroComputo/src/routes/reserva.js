import { Router } from "express";
const router = Router();
const express = require('express');

import * as reservaController from "../controllers/reserva-controller";

router.get('/menu-auxtec-reserva', (req, res) =>{
    res.render('viewsauxiliartecnico/menu');
});

router.post('/registrar-reserva/new-reserva', reservaController.registrarReserva);


router.get('/all-reservas', reservaController.allReservasFijas);

//router.get('/all-reservas', reservaController.allReservasM_S);

router.get("/editar-reserva/:id", reservaController.consultarReservaSeleccionda);

router.put('/editar-reserva/:id', reservaController.editarReservaFija);

//router.delete('/eliminar-actividad/:id', reservaController.el);

module.exports = router;