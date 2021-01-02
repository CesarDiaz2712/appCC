import Role from '../models/Role'
import user from '../models/Usuario'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signup= async(req, res)=>{
    const {nombre, apellidos, matricula, tipousuario, correo, usuario, password, confirm_password}= req.body;
    
    const newUsuario = new user({nombre, apellidos, matricula, tipousuario, correo, usuario, password});
    const errors= [];

    if(nombre.length <= 0){
        errors.push({text: 'Ingrese el campo nombre'});
    }
    if(apellidos.length <= 0){
        errors.push({text: 'Ingrese el campo apellidos'});
    }
    if(tipousuario.length <= 0){
        errors.push({text: 'Eliga el tipo de usuario'});
    }
    if(correo.length <= 0){
        errors.push({text: 'Ingrese el campo correo'});
    }
    if(usuario.length <= 0){
        errors.push({text: 'Ingrese el campo usuario'});
    }
    if(password.length <= 0){
        errors.push({text: 'Ingrese el campo contraseña'});
    }
    if(confirm_password.length <= 0){
        errors.push({text: 'Ingrese el campo confirmar contraseña'});
    }
    if(password != confirm_password){
        errors.push({text: 'No coinciden las contraseñas'});
    }
    if(password.length < 4){
        errors.push({text: 'Contraseña menor a 4 digitos'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, nombre, apellidos, matricula, tipousuario,  correo, usuario, password, confirm_password});
    }else{
        const user_email = await user.findOne({correo: correo});
        if(user_email){
            req.flash('error_msg', 'Correo ya registrado');
            res.redirect('/users/login');
        }
        /*
        if(roles){
            const foundRoles= await Role.find({name: {$in: roles}});
            newUsuario.roles=foundRoles.map(role => role._id)
        }else{
            const role= await Role.findOne({name: "estudiante"});
            newUsuario.roles = [role._id];
        }
        */

        newUsuario.password = await user.encryptPassword(password);
        const savedUser = await newUsuario.save();

        
        
        const token= jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400
        })
        
        req.flash('success_msg', 'Usuario registrado');
        res.redirect('/users/login');
    }
}

export const signin= async(req, res)=>{
    const userFound= await user.findOne({usuario: req.body.usuario});

    if(!userFound){
        req.flash('error_msg', 'Usuario no encontrado');
        res.redirect('/users/login');
    }else{
        const match= await user.matchPassword(req.body.password, userFound.password)

        if(!match){
            req.flash('error_msg', 'Contraseña invalida');
            res.redirect('/users/login');
        }else{
            
        const token= jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 86400
        })
        
        //const compareTIpo= await user.findOne({tipousuario})
        if(userFound.tipousuario=="estudiante"){
            res.redirect('/student/registrar-prestamo');
            console.log(userFound);
        }
        if(userFound.tipousuario=="auxiliartecnico"){
            res.redirect('/menu-auxtec-reserva');
            console.log(userFound);
        }
        }

    }



}

