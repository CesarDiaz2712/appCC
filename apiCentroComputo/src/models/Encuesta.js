const moongose= require('mongoose');
const {Schema} = moongose;

const EncuestaSchema = new Schema({
    pregunta1: {type: String, required:true},
    pregunta2: {type:String, required:true},
    respuesta2: {type:String, required:true},
    comentario: {type:String, required:true},
    date: {type: Date, default: Date.now}
});
module.exports= moongose.model('Encuesta', EncuestaSchema);