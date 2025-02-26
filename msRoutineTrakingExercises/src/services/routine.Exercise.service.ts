import { RoutineExerciseModel } from "../shemas/RoutineExercise.schema"
import { ErrorType } from "../types/error.type";
import { ResRoutineExerciseType, RoutineExerciseType } from "../types/RoutineTrakingExercise.type"
import { getCurrentDate } from "../utils/dateUntil";

export const getAllRoutineTrakingExerciseService = async (limit: number, offset: number, userId: string, routineTrakingId?: string): Promise<ResRoutineExerciseType[]> => {
    var filter = {};

    filter = routineTrakingId != undefined ? 
    {
        userId: userId,
        routineTrakingId: routineTrakingId
    } : 
    {
        userId: userId
    }

    const res = await RoutineExerciseModel.find(filter).limit(limit).skip(offset - 1);

    console.log(res);
    

    return res.map(item => ({
        id: item.id,
        routineTrakingId: item.routineTrakingId,
        exerciseId: item.exerciseId,
        series: item.series.map(serie => ({
            repetitions: serie.repetitions,
            weight: serie.weight,
            time: serie.time,
            dateCreate: serie.dateCreate,
        }))
        
    } as ResRoutineExerciseType))
}

export const getRoutineTrakingExerciseByIdService = async (userId: string, id: string): Promise<ResRoutineExerciseType> => {
    const res = await RoutineExerciseModel.findOne({ _id: id, userId: userId });

    if (res === null) throw { code: 404, message: 'routine_exercise not found' } as ErrorType;

    return {
        id: res.id,
        routineTrakingId: res.routineTrakingId,
        exerciseId: res.exerciseId,
        series: (res.series) ? res.series.map(item => ({
            repetitions: item.repetitions,
            weight: item.weight,
            time: item.time,
            dateCreate: item.dateCreate
        })) : {}
    } as ResRoutineExerciseType;
}

export const getRoutineTrakingExerciseByRoutineAndExerciseService = async ( userId: string, routineTrakingId: string, exerciseId: string ): Promise<ResRoutineExerciseType> => {
    const res = await RoutineExerciseModel.findOne(
        { 
            userId: userId,
            routineTrakingId: routineTrakingId, 
            exerciseId: exerciseId 
        });

    if (res === null) return {} as ResRoutineExerciseType;

    return {
        id: res.id,
        routineTrakingId: res.routineTrakingId,
        exerciseId: res.exerciseId,
        series: (res.series) ? res.series.map(item => ({
            repetitions: item.repetitions,
            weight: item.weight,
            time: item.time,
            dateCreate: item.dateCreate
        })) : {}
    } as ResRoutineExerciseType;
}

export const insertRoutineTrakingExerciseService = async (data: RoutineExerciseType): Promise<ResRoutineExerciseType> => {
    const newVal = new RoutineExerciseModel({
        ...data,
        series: []

    });
    const res = await newVal.save();
    if (!res) throw { code: 400, message: 'routine_exercise is not insert' } as ErrorType;

    return {
        id: newVal.id,
        routineTrakingId: data.routineTrakingId,
        exerciseId: data.exerciseId,
        series: []
    } as ResRoutineExerciseType;
}

export const deleteRoutineTrakingExerciseService = async (id: string) => {
    const res = await RoutineExerciseModel.deleteOne({_id: id});

    if (res.deletedCount <= 0) throw { code: 400, message: 'routine_exercise is not delete' } as ErrorType;
}

export const addSerieRoutineTrakingExerciseService = async (id: string, oldData: ResRoutineExerciseType, newData: RoutineExerciseType) => {
    newData.series.map(item => {
        item.repetitions = (item.repetitions) ? item.repetitions : 0;
        item.weight = (item.weight) ? item.weight : 0;
        item.time = (item.time) ? item.time : 0;
        item.dateCreate = getCurrentDate();

        oldData.series.push(item)
    });
    
    const res = await RoutineExerciseModel.updateOne({_id: id}, {series: oldData.series});

    if(res.modifiedCount == 0) throw {code: 400, message: 'serie is not added'} as ErrorType;

    return {
        id: id,
        routineTrakingId: oldData.routineTrakingId,
        exerciseId: oldData.exerciseId,
        series: oldData.series
    } as RoutineExerciseType;
}