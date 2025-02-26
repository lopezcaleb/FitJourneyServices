import {Application} from 'express';
import { routerRoutineExercise } from './v1/routesRoutine.Exercise';

export const routesV1 = (app: Application ) => {
    const signature = '/v1/fitjourney'
    app.use(`${signature}/routine_traking_exercise/`, routerRoutineExercise);
}