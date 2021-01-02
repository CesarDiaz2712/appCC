import {Router} from "express";
const router = Router();
import * as actividadControll from '../controllers/actividad.conttroller'


router.get('/registro-actividad', (req, res) =>{
    res.render('viewsauxiliartecnico/registrar-actividades');
});

router.post('/registrar-actividad/new-actividad', actividadControll.createActividad);


router.get('/all-actividades', actividadControll.allActividades);

router.get("/editar-actividad/:id", actividadControll.consultarActividadSeleccionda);

router.put('/editar-actividades/:id', actividadControll.editarActividad);

router.delete('/eliminar-actividad/:id', actividadControll.eliminarActividad);

export default router;