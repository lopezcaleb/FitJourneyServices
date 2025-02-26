import { routineModel } from "../schemes/routineScheme"
import { ErrorType } from "../types/error.type";
import { ResRoutineType, RoutineType } from "../types/routine.type"

export const getAllRoutineService = async (limit: number, offset: number, userId: string, ): Promise<ResRoutineType[]> => {
    const res = await routineModel.find({userId: userId}).limit(limit).skip(offset - 1);
    return res.map(item => ({
        id: item.id,
        name: item.name,
        exercises: item.exercises,
        dateCreate: item.dateCreate
    } as ResRoutineType));
}

export const getRoutineByIdService = async (id: string): Promise<ResRoutineType> => {
    const res = await routineModel.findById(id);
    if(res == null ) throw { code: 404, message: 'routine not found' } as ErrorType;
    return {
        id: res.id,
        name: res.name,
        exercises: res.exercises,
        dateCreate: res.dateCreate
    } as ResRoutineType;
}

export const getRoutineByIdAndByExerciseIdService = async (id: string, exercises: string): Promise<ResRoutineType | null> => {
    const res = await routineModel.findOne({_id: id, exercises: exercises});
    console.log(res);
    if(res == null ) return null;
    return {
        id: res.id,
        name: res.name,
        exercises: res.exercises,
        dateCreate: res.dateCreate
    } as ResRoutineType;
}

export const deleteExercisesFromRoutineByIdService = async (id: string, oldData: ResRoutineType, exercises: string[]): Promise<ResRoutineType | null> => {

    oldData.exercises = oldData.exercises.filter(item => !exercises.includes(item));

    const res = await routineModel.updateOne({_id: id}, oldData);
    console.log(res);
    if(res == null ) return null;
    return {
        id: oldData.id,
        name: oldData.name,
        exercises: oldData.exercises,
        dateCreate: oldData.dateCreate
    } as ResRoutineType;
}

export const getRoutineByNameService = async (name: string, userId?: string): Promise<ResRoutineType> => {
    var filter = {};
    filter = (userId != undefined) ?
         {
            name: name,
            userId: userId,
         } : 
         {
            name: name
         };

    const res = await routineModel.findOne(filter);
    if(res == null ) return {} as ResRoutineType;
    return {
        id: res.id,
        name: res.name,
        exercises: res.exercises,
        dateCreate: res.dateCreate
    } as ResRoutineType;
}

export const insertRoutineService = async (data: RoutineType): Promise<ResRoutineType> => {
    const newRoutine = new routineModel(data);
    const res = await newRoutine.save();
    if(!res) throw { code: 400, message: 'routine is not insert' } as ErrorType;
    return {
        id: res.id,
        name: data.name,
        exercises: data.exercises,
        dateCreate: data.dateCreate
    } as ResRoutineType;
}

export const updateRoutineService= async (id: string, oldData: ResRoutineType, newData: RoutineType): Promise<ResRoutineType> => {
    const data = {
        name: newData.name != undefined ? newData.name : oldData.name,
        exercises: newData.exercises != undefined ? newData.exercises : oldData.exercises,
    } as ResRoutineType;

    await routineModel.updateOne({_id: id}, data);

    return {
        id: id,
        name: data.name,
        exercises: data.exercises,
        dateCreate: data.dateCreate
    } as ResRoutineType;
}

export const addExerciseToRoutineService = async (id: string, oldData: ResRoutineType, newExercises: string[]): Promise<ResRoutineType> => {

    newExercises.map(item => (oldData.exercises.push(item)));

    await routineModel.updateOne({_id: id}, { exercises: oldData.exercises });

    return {
        id: id,
        name: oldData.name,
        exercises: oldData.exercises,
        dateCreate: oldData.dateCreate
    } as ResRoutineType;
}

export const deleteRoutineService = async (id: string) => {
    const res = await routineModel.deleteOne({_id: id});
    if (res.deletedCount <= 0) throw { code: 400, message: 'routine is not delete' } as ErrorType;
}