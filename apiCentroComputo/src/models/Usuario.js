import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
/*const moongose= require('mongoose');
const {Schema} = moongose;

const bcrypt= require('bcryptjs');
*/

const UsuarioSchema = new Schema(
    {
    nombre: {type: String, required:true},
    apellidos: {type:String, required:true},
    matricula: {type:String, required:true},
    tipousuario: {type:String, required:true},
    correo: {type:String, required:true},
    usuario: {type:String, required:true},
    password: {type:String, required:true},
    //roles: [{type: Schema.Types.ObjectId, ref:"Role",},],
    date: {type: Date, default: Date.now}
    },{
        timestamps: true,
        versionKey: false,
    }
);

UsuarioSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UsuarioSchema.statics.matchPassword = async (password, receivedpassword)=>{
    return await bcrypt.compare(password, receivedpassword);
};


export default model("Usuario", UsuarioSchema);

//module.exports= moongose.model('Usuario', UsuarioSchema);