import ReservaM_S from "../models/ReservaM-S"
import ReservaFija from "../models/ReservaFija"

export const registrarReserva= async(req, res)=>{

    const {tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion, motivo}= req.body;
    const errors=[];

    if(!fechareserv){
        errors.push({text:'Por favor responde la encuesta 1'});
    }
    if(!tiporeserv){
        errors.push({text:'Por favor responde la encuesta 2'});
    }
    if(!horainicio){
        errors.push({text:'Por favor responde la encuesta 3'});
    }

    if(errors.length){
        res.render('viewsauxiliartecnico/menu',{
            errors,tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion
        });
    }else{
        if(tiporeserv=="Momentanea" || tiporeserv=="Sala"){

            const newReservaM_S = new ReservaM_S({
                tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, motivo});
            console.log(newReservaM_S);
            await newReservaM_S.save();
        }
        if(tiporeserv=="Fija"){

            const newReservaFija  = new ReservaFija ({
                tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion});
            console.log(newReservaFija);
            await newReservaFija.save();
        }
        
        res.redirect('/menu-auxtec-reserva');
    }
};

export const allReservasFijas = async(req, res)=>{
    const reservasF = await ReservaFija.find()
      .sort({ date: "desc" })
      .lean();
      console.log(reservasF);
    res.render("viewsauxiliartecnico/consulta-reservas", {reservasF});
};

export const allReservasM_S = async(req, res)=>{
    const reservasm_s = await ReservaM_S.find()
      .sort({ date: "desc" })
      .lean();
      
      console.log(reservasm_s);
    res.render("viewsauxiliartecnico/consulta-reservas", { reservasm_s});
};


export const consultarReservaSeleccionda= async(req,res)=>{
    
    const reservaFija =await ReservaFija.findById(req.params.id).lean();
    console.log(ReservaFija);
    res.render('viewsauxiliartecnico/editar-reserva', {reservaFija});
};


export const editarReservaFija = async(req,res)=>{
    
    const {tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion}= req.body;

    await ReservaFija.findByIdAndUpdate(req.params.id,{tiporeserv, fechareserv, horainicio, horafin, salon, solicitante, descripcion});
    console.log('ok');
    res.redirect('/act/all-reservas');
}