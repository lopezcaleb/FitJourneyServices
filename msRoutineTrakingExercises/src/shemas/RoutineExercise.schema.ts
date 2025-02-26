import {Schema, model} from 'mongoose';

const RoutineExerciseSchema = new Schema({
    routineTrakingId: { type: String, required: true },
    userId: { type: String, required: true },
    exerciseId: { type: String, required: true },
    series: [{
        repetitions: { type: Number, required: true },
        weight: { type: Number, required: true },
        time: { type: Number, required: true },
        dateCreate: { type: String, required: true },
    }],
    
    
});
export const RoutineExerciseModel = model('routineTrakingExercise', RoutineExerciseSchema);