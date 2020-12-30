const moongose= require('mongoose');
const {Schema} = moongose;


const ReservaM_SSchema = new Schema({
    tiporeserv: {type: String, required:true},
    fechareserv: {type:String, required:true},
    horainicio: {type:String, required:true},
    horafin: {type:String, required:true},
    preguntasalon: {type:String, required:true},
    solicitante: {type:String, required:true},
    motivo: {type:String, required:true},
    date: {type: Date, default: Date.now}
});

module.exports= moongose.model('ReservaM_S', ReservaM_SSchema);
