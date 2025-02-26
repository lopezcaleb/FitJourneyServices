import {Request, Response} from 'express';
import { ErrorException } from '../utils/errorUtil';
import { RoutineExerciseType } from '../types/RoutineTrakingExercise.type';
import { addSerieRoutineTrakingExerciseService, deleteRoutineTrakingExerciseService, getAllRoutineTrakingExerciseService, getRoutineTrakingExerciseByIdService, getRoutineTrakingExerciseByRoutineAndExerciseService, insertRoutineTrakingExerciseService } from '../services/routine.Exercise.service';
import { validationObjectIsEmpty } from '../utils/validationUtil';
import { ErrorType } from '../types/error.type';
import { GetExerciseById } from '../api/msExercise/exercise.api';
import { routineTrakingApi } from '../api/msExercise/routine_traking.api';

export const getAllRoutineTrakingExercise = async (req: Request<{}, {}, {}, {limit?: string, offset: string, routineTrakingId?: string}>, res: Response) => {
    try {
        const {limit, offset, routineTrakingId} = req  .query;
        
        const limitValue = limit != undefined ? Number(limit) : 10;
        const offsetValue = offset != undefined ? Number(offset) : 1;

        res.status(200).send(await getAllRoutineTrakingExerciseService(limitValue, offsetValue, req.userId!, routineTrakingId));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const getRoutineTrakingExercise = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        res.status(200).send(await getRoutineTrakingExerciseByIdService(req.userId!, id));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const insertRoutineTrakingExercise = async (req: Request<{}, {}, RoutineExerciseType, {}>, res: Response) => {
    try {
        const data = req.body;

        await routineTrakingApi.getRoutineTraking(data.routineTrakingId, req.token);
        await GetExerciseById(req.token, data.exerciseId);

        const exist = await getRoutineTrakingExerciseByRoutineAndExerciseService(req.userId!, data.routineTrakingId, data.exerciseId);
        if(!validationObjectIsEmpty(exist)) throw {code: 400, message: 'routine_exercise is alredy exist'} as ErrorType;

        res.status(201).send(await insertRoutineTrakingExerciseService({...data, userId: req.userId}));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const deleteRoutineTrakingExercise = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        res.status(200).send(await deleteRoutineTrakingExerciseService(id));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const addSerieRoutineTrakingExercise = async (req: Request<{}, {}, RoutineExerciseType, {id: string}>, res: Response) => {
    try {
        const data = req.body;
    const {id} = req.query;

    const oldData = await getRoutineTrakingExerciseByIdService(req.userId!, id);

    res.status(200).send(await addSerieRoutineTrakingExerciseService(id, oldData, data));
    } catch (error) {
        ErrorException(res, error);
    }

}