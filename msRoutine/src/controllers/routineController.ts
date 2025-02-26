import { Request, Response } from 'express';
import { ErrorException } from '../utils/errorUtil';
import { addExerciseToRoutineService, deleteRoutineService, getAllRoutineService, getRoutineByIdService, getRoutineByIdAndByExerciseIdService, getRoutineByNameService, insertRoutineService, updateRoutineService, deleteExercisesFromRoutineByIdService } from '../services/routine.service';
import { RoutineType } from '../types/routine.type';
import { getDateNow, validationObjectIsEmpty } from '../utils/validationUtil';
import { ErrorType } from '../types/error.type';
import { msExercise } from '../api/msExercise.api';
import { isAxiosError } from 'axios';

export const getAllRoutine = async ( req: Request<{}, {}, {}, {limit: string, offset: string}>, res: Response ) => {
    try {
        const {limit, offset} = req.query;
        
        const limitValue = limit != undefined ? Number(limit) : 10;
        const offsetValue = offset != undefined ? Number(offset) : 1;

        res.status(200).send(await getAllRoutineService(limitValue, offsetValue, req.userId!));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const getRoutine = async ( req: Request<{}, {}, {}, {id: string}>, res: Response ) => {
    try {
        const {id} = req.query;
        res.status(200).send(await getRoutineByIdService(id));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const insertRoutine = async ( req: Request<{}, {}, RoutineType, {}>, res: Response ) => {
    try {
        const data = req.body;

        if(data.name != undefined){
            const existName = await getRoutineByNameService(data.name, req.userId);
            if(!validationObjectIsEmpty(existName)) throw {code: 400, message: 'name alredy exist'} as ErrorType;
        }
        
        // Validata if exercise exist
        try {
            await Promise.all(
              data.exercises.map(async (id) => {
                await msExercise.getExerciseById(id, req.token!);
              })
            );
        } catch (error) {
            if (isAxiosError(error)) throw { code: 400, message: error.response?.data.message} as ErrorType;
            throw { code: 500, message: `Internal server error`} as ErrorType;
        }

        res.status(201).send(await insertRoutineService({
            name: (data.name != undefined) ? data.name : getDateNow(),
            userId: req.userId!,
            exercises: data.exercises,
            dateCreate: getDateNow()
        } as RoutineType));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const updateRoutine = async ( req: Request<{}, {}, RoutineType, {id: string}>, res: Response ) => {
    try {
        const {id} = req.query;
        const data = req.body;

        await getRoutineByIdService(id);

        if(data.name != undefined){
            const existName = await getRoutineByNameService(data.name, req.userId);
            if(!validationObjectIsEmpty(existName)) throw {code: 400, message: 'name alredy exist'} as ErrorType;
        }
        
        // Validata if exercise exist
        try {
            await Promise.all(
              data.exercises.map(async (id) => {
                await msExercise.getExerciseById(id, req.token!);
              })
            );
        } catch (error) {
            if (isAxiosError(error)) throw { code: 400, message: error.response?.data.message} as ErrorType;
            throw { code: 500, message: `Internal server error`} as ErrorType;
        }


        const oldData = await getRoutineByIdService(id);

        res.status(200).send(await updateRoutineService(
            id, 
            oldData, 
            {
                name: (data.name != undefined) ? data.name : getDateNow(),
            } as RoutineType
        ));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const addExerciseToRoutine = async ( req: Request<{}, {}, RoutineType, {id: string}>, res: Response ) => {
    try {
        const {id} = req.query;
        const data = req.body;

        await getRoutineByIdService(id);
        
        // Validata if exercise exist
        try {
            await Promise.all(
              data.exercises.map(async (id) => {
                await msExercise.getExerciseById(id, req.token!);
              })
            );
        } catch (error) {
            if (isAxiosError(error)) throw { code: 400, message: error.response?.data.message} as ErrorType;
            throw { code: 500, message: `Internal server error`} as ErrorType;
        }

        await Promise.all(
            data.exercises.map( async item => {
                const exist = await getRoutineByIdAndByExerciseIdService(id, item);
                if (exist !=  null) {
                    throw { code: 400, message: "exercise is alredy in routine"} as ErrorType;
                }
            }
        ));

        const oldData = await getRoutineByIdService(id);

        res.status(200).send(await addExerciseToRoutineService(
            id, 
            oldData, 
            data.exercises
        ));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const deleteExercisesFromRoutineById = async ( req: Request<{}, {}, RoutineType, {id: string}>, res: Response ) => {
    try {
        const {id} = req.query;
        const data = req.body;

        await getRoutineByIdService(id);

        const oldData = await getRoutineByIdService(id);

        res.status(200).send(await deleteExercisesFromRoutineByIdService(
            id, 
            oldData, 
            data.exercises
        ));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const deleteRoutine = async ( req: Request<{}, {}, {}, {id: string}>, res: Response ) => {
    try {
        const {id} = req.query;
        res.status(200).send(await deleteRoutineService(id));
    } catch (error) {
        ErrorException(res, error);
    }
}