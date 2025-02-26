import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema({
    name: { type: String, require },
    muscleGroupId: { type: String, require },
    trainingStyleId: { type: String, require },
    imageUrl: { type: String },
    details: { type: String },
});

export const exerciseModel = model('exercise', exerciseSchema);