const express = require('express');
const router = express.Router();

const Encuesta = require('../models/Encuesta');

import {authJwt} from '../middlewares'
import * as encuestaControl from "../controllers/encuesta.controller";

//estudiante
router.get('/encuestaest', function(req, res){
    res.render('viewsestudiante/encuesta');
});

router.post('/encuesta/new-encuesta', encuestaControl.crearEncuesta);

module.exports = router;