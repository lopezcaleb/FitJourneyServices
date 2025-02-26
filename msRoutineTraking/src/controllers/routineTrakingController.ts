import { Request, Response } from "express"
import { ErrorException } from "../utils/errorUtil";
import { completeRoutineTrakingByIsActiveService, deleteRoutineTrakingByIdService, getAllRoutinesTrakingService, getRoutineTrakingByIdService, InsertRoutineTrakingServise, updateRoutineTrakingByIdService } from "../Services/routine_traking.service";
import { routine_trakin_type } from "../types/routine_traking.type";
import { getCurrentDate } from "../utils/dateUntil";
import { routineApi } from "../api/routine.api";
import { routineTrakingExerciseApi } from "../api/routineTrakingExercise";


export const getAllRoutinesTraking = async (req: Request<{}, {}, {}, {limit: string, offset: string, routineId: string, state?: string}>, res: Response) => {
    try {
        const userId = req.userId;
        const {limit, offset, routineId, state} = req.query;

        const limitValue = limit != undefined ? Number(limit) : 10;
        const offsetValue = offset != undefined ? Number(offset) : 1;

        res.status(200).send(await getAllRoutinesTrakingService(limitValue, offsetValue, userId!, routineId, state));
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const getRoutineTraking = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.query;

        res.status(200).send(await getRoutineTrakingByIdService(userId!, id));
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const insertRoutineTraking = async (req: Request<{}, {}, routine_trakin_type, {}>, res: Response) => {
    try {
        const userId = req.userId;
        const data = req.body;

        // validate if routineID exist
        const routineData = await routineApi.getRoutineById(data.routineId, req.token!);

        data.state = data.state != undefined ? data.state : 'create';
        data.dateCreate = getCurrentDate();

        const resInsert = await InsertRoutineTrakingServise({...data, userId: userId!});
        
        await Promise.all(
            routineData.exercises.map(item => 
                routineTrakingExerciseApi.insertRoutineTrakingExercise(req.token!, {
                    exerciseId: item,
                    routineTrakingId: resInsert.id
                })
            )
        );

        res.status(201).send(resInsert);
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const updateRoutineTraking = async (req: Request<{}, {}, routine_trakin_type, {id: string}>, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.query;
        const data = req.body;

        // validate if routineTraking exist
        const routineTrakingOld = await getRoutineTrakingByIdService(userId!, id);

        if(data.state == 'active') await completeRoutineTrakingByIsActiveService(req.userId!);

        res.status(200).send(await updateRoutineTrakingByIdService(id, routineTrakingOld, data));
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const deleteRoutineTraking = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const userId = req.userId;
        const { id } = req.query;

        // validate if routineTraking exist
        const routineTrakingOld = await getRoutineTrakingByIdService(userId!, id);

        res.status(200).send(await deleteRoutineTrakingByIdService(userId!, id));
    } catch (error) {
        ErrorException(res, error);    
    }
}
