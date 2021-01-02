import Product from "../models/Encuesta";

export const crearEncuesta= async(req, res)=>{
    const {pregunta1, pregunta2, respuesta2, comentario}= req.body;
    const errors=[];

    if(!pregunta1){
        errors.push({text:'Por favor responde la encuesta 1'});
    }
    if(!pregunta2){
        errors.push({text:'Por favor responde la encuesta 2'});
    }
    if(!comentario){
        errors.push({text:'Por favor responde la encuesta 3'});
    }
    if(pregunta2=='no'){
        if(!respuesta2){
            errors.push({text:'Por favor responde la encuesta 4'});
        }
    }

    if(errors.length){
        res.render('viewsestudiante/encuesta',{
            errors,
            pregunta1,
            pregunta2,
            respuesta2,
            comentario
        });
    }else{
        const newEncuesta = new Encuesta({
            pregunta1,
            pregunta2,
            respuesta2,
            comentario});
        //await newEncuesta.save();
        req.flash('success_msg', 'Encuesta guardada satisfactorimente');
        res.redirect('/encuesta');
    }
};