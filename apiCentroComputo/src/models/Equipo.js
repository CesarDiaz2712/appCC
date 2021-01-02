const moongose= require('mongoose');
const {Schema} = moongose;

const EquipoSchema = new Schema({
    numeroInventario: {type:String, required:true},
    numeroSerie: {type:String, required:true},
    marca: {type:String, required:true},
    modelo: {type:String, required:true},
    tipo: {type:String, required:true},
    descripcion: {type:String, required:true},
    date: {type: Date, default: Date.now}
});
module.exports= moongose.model('Equipo', EquipoSchema);