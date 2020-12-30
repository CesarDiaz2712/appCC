const moongose= require('mongoose');
const {Schema} = moongose;

const bcrypt= require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre: {type: String, required:true},
    apellidos: {type:String, required:true},
    matricula: {type:String, required:true},
    tipousuario: {type:String, required:true},
    correo: {type:String, required:true},
    usuario: {type:String, required:true},
    password: {type:String, required:true},
    date: {type: Date, default: Date.now}
});
UsuarioSchema.methods.encryptPassword= async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UsuarioSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports= moongose.model('Usuario', UsuarioSchema);