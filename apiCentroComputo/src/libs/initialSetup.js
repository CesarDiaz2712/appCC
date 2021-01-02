import Role from '../models/Role'

export const createRoles= async() =>{
    try {
        const count = await Role.estimatedDocumentCount();
        if(count > 0) return

        const values= await Promise.all([
            new Role({name: "estudiante"}).save(),
            new Role({name: "academico"}).save(),
            new Role({name: "auxiliartecnico"}).save(),
            new Role({name: "tecnicoacademico"}).save()
        ])

        console.log(values);
    } catch (error) {
        console.log(error);
    }
}