import {Router} from "express";
const router = Router();
import * as actividadControll from '../controllers/actividad.conttroller'
import Actividad from "../models/Actividad";


router.get('/registro-actividad', (req, res) =>{
    res.render('viewsauxiliartecnico/registrar-actividades');
});

router.post('/registrar-actividad/new-actividad', actividadControll.createActividad);


router.get('/all-actividades', actividadControll.allActividades);

router.post('/all-actividades');

router.post('/eliminar-actividad', actividadControll.eliminarActividad);


router.get("/editar-actividad/:id", async(req, res)=>{
    const actividad =await Actividad.findById(req.params.id);
    res.render('viewsauxiliartecnico/registrar-actividades', {actividad});
});

export default router;