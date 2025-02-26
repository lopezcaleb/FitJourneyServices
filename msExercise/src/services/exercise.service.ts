import { exerciseModel } from "../schemas/exercise.schemas"
import { ErrorType } from "../types/error.type";
import { exerciseType } from "../types/exercise.type";

export const GetAllExerciseService = async ( muscleGroupId?: string, trainingStyleId?: string): Promise<exerciseType[]> => {
    var filter: any = {};

    if( muscleGroupId != undefined ) filter.muscleGroupId = muscleGroupId ;
    if( trainingStyleId != undefined ) filter.trainingStyleId =  trainingStyleId;

    const res = await exerciseModel.find(filter);
    return res.map( item => ({
        id: item.id,
        name: item.name,
        muscleGroupId: item.muscleGroupId,
        trainingStyleId: item.trainingStyleId,
        imageUrl: item.imageUrl,
        details: item.details,
    } as exerciseType) );
}

export const GetExerciseServiceById = async (id: string): Promise<exerciseType> => {
    const res = await exerciseModel.findById(id);
    if(res===null) throw { code: 404, message: 'exercise is not found' } as ErrorType;
    return {
        id: res.id,
        name: res.name,
        muscleGroupId: res.muscleGroupId,
        trainingStyleId: res.trainingStyleId,
        imageUrl: res.imageUrl,
        details: res.details
    } as exerciseType;
}

export const GetExerciseServiceByName = async (muscleGroupId: string, name: string): Promise<exerciseType> => {
    const res = await exerciseModel.findOne({muscleGroupId: muscleGroupId, name: name});
    if(res===null) return {} as exerciseType;
    return {
        id: res.id,
        name: res.name,
        muscleGroupId: res.muscleGroupId,
        trainingStyleId: res.trainingStyleId,
        imageUrl: res.imageUrl,
        details: res.details
    } as exerciseType;
}

export const InsertExerciseService = async (data: exerciseType): Promise<exerciseType> => {
    const newExercise = new exerciseModel(data);
    const res = await newExercise.save();
    if(!res) throw {code: 400, message: 'exercise is not insert'} as ErrorType;

    return {
        id: newExercise._id.toString(),
        name: newExercise.name,
        muscleGroupId: newExercise.muscleGroupId,
        trainingStyleId: newExercise.trainingStyleId,
        imageUrl: newExercise.imageUrl,
        details: newExercise.details
    } as exerciseType;
}

export const UpdateExerciseService = async (id: string, oldData: exerciseType, newData: exerciseType) => {
    const data = {
        name: newData.name != undefined ? newData.name : oldData.name,
        imageUrl: newData.imageUrl != undefined ? newData.imageUrl : oldData.imageUrl,
        details: newData.details != undefined ? newData.details : oldData.details,
    } as exerciseType; 
    await exerciseModel.updateOne({_id: id}, data);

    return data;
}

export const DeleteExerciseService = async (id: string) => {
    const res = await exerciseModel.deleteOne({_id: id});
    if(res.deletedCount <= 0) throw { code: 400, message: 'exercise is not delete' } as ErrorType;
}