import { Request, Response } from 'express';
import { ErrorException } from '../utils/errorUtil';
import { DeleteExerciseService, GetAllExerciseService, GetExerciseServiceById, GetExerciseServiceByName, InsertExerciseService, UpdateExerciseService } from '../services/exercise.service';
import { exerciseType } from '../types/exercise.type';
import { validationObjectIsEmpty } from '../utils/validationUtil';
import { ErrorType } from '../types/error.type';
import { exerciseSeeds } from '../seeds/exercisesSeeds';
import { muscleGroupApi } from '../api/msCategories/muscle-group.api';
import { trainingStyleApi } from '../api/msCategories/training-styles-api';

export const GetAllExercise = async (req: Request<{}, {}, {}, {muscleGroupId?: string, trainingStyleId: string}>, res: Response) => {
    try {
        const {muscleGroupId, trainingStyleId} = req.query;
        

        if(muscleGroupId != undefined) await muscleGroupApi.getMusclegroupIdById(req.token, muscleGroupId);
        if(trainingStyleId != undefined) await trainingStyleApi.getTrainingStyleIdById(req.token, trainingStyleId);

        res.status(200).send(await GetAllExerciseService(muscleGroupId, trainingStyleId));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const GetExercise = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const { id } = req.query;
        res.status(200).send(await GetExerciseServiceById(id));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const InsertExercise = async (req: Request<{}, {}, exerciseType, {}>, res: Response) => {
    try {
        const data = req.body;     
        await  muscleGroupApi.getMusclegroupIdById(req.token, data.muscleGroupId);
        await trainingStyleApi.getTrainingStyleIdById(req.token, data.trainingStyleId);

        const existName = await GetExerciseServiceByName(data.muscleGroupId, data.name);
        if(!validationObjectIsEmpty(existName)) throw { code: 400, message: 'exercise name alredy exist' } as ErrorType ;
        res.status(201).send(await InsertExerciseService(data));        
    } catch (error) {
        ErrorException(res, error);
    }
}

export const UpdateExercise = async (req: Request<{}, {}, exerciseType, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        const data = req.body;
        const oldData = await GetExerciseServiceById(id);
        const existName = await GetExerciseServiceByName(oldData.muscleGroupId, data.name);
        
        if(!validationObjectIsEmpty(existName)) throw { code: 400, message: 'exercise name alredy exist' } as ErrorType ;
        res.status(200).send(await UpdateExerciseService(id, oldData, data));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const DeleteExercise = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        await GetExerciseServiceById(id);
        await DeleteExerciseService(id);
        res.status(200).send();
    } catch (error) {
        ErrorException(res, error);
    }
}

export const AddExercisesSeed = async (req: Request, res: Response) => {
    try {
        // Get list exercises
        const exercisesListSeeds = await exerciseSeeds(req.token);

        // Insert list exercises
        exercisesListSeeds.map(async item => {
            insertExerciseIfNotExist(item);
        });

        res.status(201).send(exercisesListSeeds);

    } catch (error) {
        ErrorException(res, error);
    }
}

// Validate if exercise exist in db, if not exist add in db
const insertExerciseIfNotExist = async ( exercise: exerciseType ) => {
    const existName = await GetExerciseServiceByName(exercise.muscleGroupId, exercise.name);
    if(validationObjectIsEmpty(existName)) InsertExerciseService(exercise);
}