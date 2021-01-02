import {Schema, model} from 'mongoose'

export const ROLES = ["estudiante", "tecnicoacademico", "academico"];

const RoleSchema = new Schema(
    {
    name: String,
    },
    {
    versionKey: false,
    }
);
export default model("Role", RoleSchema);