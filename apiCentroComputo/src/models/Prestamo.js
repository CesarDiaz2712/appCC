const moongose= require('mongoose');
const {Schema} = moongose;

const PrestamoSchema = new Schema({
    fechaPrestamo: {type: Date, required:true},
    experiencia: {type:String, required:true},
    horario: {type:String, required:true},
    salon: {type:String, required:true},
    solicitante: {type:String, required:true},
    equipo: {type:String, required:true},
    date: {type: Date, default: Date.now}
});
module.exports= moongose.model('Prestamo', PrestamoSchema);