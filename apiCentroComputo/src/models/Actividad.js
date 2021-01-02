const moongose= require('mongoose');
const {Schema} = moongose;

const ActividadSchema = new Schema({
    nrc: {type:String, required:true},
    nombre: {type:String, required:true},
    carrera: {type:String, required:true},
    bloque: {type:String, required:true},
    seccion: {type:String, required:true},
    date: {type: Date, default: Date.now}
});
module.exports= moongose.model('Actividad', ActividadSchema);