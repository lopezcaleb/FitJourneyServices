import {Schema, model} from "mongoose"

const rotineTrakingSchema = new Schema({
    routineId: {type: String, require},
    userId: {type: String, require},
    dateCreate: {type: String, require},
    state: {type: String, require},
});

export const routineTrakingModel = model('routineTraking', rotineTrakingSchema)