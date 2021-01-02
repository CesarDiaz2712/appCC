import Actividad from "../models/Actividad";


export const createActividad = async (req, res) =>{
    const {nrc, nombre, carrera, bloque, seccion}= req.body;
    const errors=[];

    if(!nrc){
        errors.push({text:'Por favor llena el nrc'});
    }
    if(!nombre){
        errors.push({text:'Por favor llena el nombre'});
    }
    if(!carrera){
        errors.push({text:'Por favor llena la carrera'});
    }
    if(!bloque){
        errors.push({text:'Por favor selecciona el bloque'});
    }
    if(!seccion){
        errors.push({text:'Por favor selecciona la seccion'});
    }

    if(errors.length){
        res.render('viewsauxiliartecnico/registrar-actividad',{
            errors,nrc, nombre, carrera, bloque, seccion
        });
    }else{

            const newActividad = new Actividad({
                nrc, nombre, carrera, bloque, seccion});
            console.log(newActividad);
            await newActividad.save();
        
        res.redirect('/menu-auxtec-reserva');
    }
};

export const allActividades= async (req, res) => {
    const actividades = await Actividad.find()
      .sort({ date: "desc" })
      .lean();
    res.render("viewsauxiliartecnico/consulta-actividades", { actividades });
  };


export const editarActividad= async(req,res)=>{
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/notes");
};

export const eliminarActividad= async(req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/notes");
};