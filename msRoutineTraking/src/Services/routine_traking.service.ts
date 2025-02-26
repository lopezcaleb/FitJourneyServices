import { routineTrakingModel } from "../schemas/routine_traking.schema"
import { ErrorType } from "../types/error.type";
import { response_routine_trakin_type, routine_trakin_type } from "../types/routine_traking.type";

export const getAllRoutinesTrakingService = async (limit: number, offset: number, userId: string, routineId?: string, state?: string): Promise<response_routine_trakin_type[]> => {
    const query: any = { userId };
    if (routineId) query.routineId = routineId;
    if (state) query.state = state;
    
    const res = await routineTrakingModel.find(query).limit(limit).skip(offset - 1);

    return  res.map( item => ({
        id: item.id,
        routineId: item.routineId,
        dateCreate: item.dateCreate,
        state: item.state,
    } as response_routine_trakin_type));
};

export const getRoutineTrakingByIdService = async (userId: string, routineTrakingId: string): Promise<response_routine_trakin_type> => {
    const res = await routineTrakingModel.findOne({ _id: routineTrakingId, userId: userId });

    if(!res) throw { code: 400, message: 'Routine traking is not found' } as ErrorType;

    return {
        id: res.id,
        routineId: res.routineId,
        dateCreate: res.dateCreate,
        state: res.state
    } as response_routine_trakin_type;
};

export const InsertRoutineTrakingServise = async (data: routine_trakin_type): Promise<response_routine_trakin_type> => {
    const routineTraking = new routineTrakingModel(data);
    const res = await routineTraking.save();

    if(!res) throw { code: 400, message: 'Routine traking is register' } as ErrorType;

    return {
        id: res.id,
        routineId: data.routineId,
        dateCreate: data.dateCreate,
        state: data.state
    } as response_routine_trakin_type;
};

export const updateRoutineTrakingByIdService = async (id: string, oldData: response_routine_trakin_type, newData: response_routine_trakin_type): Promise<response_routine_trakin_type> => {
    const res = await routineTrakingModel.updateOne({_id: id}, {state: newData.state});

    if(res.matchedCount === 0) throw { code: 400, message: 'Routine traking is update' } as ErrorType;

    return {
        id: id,
        routineId: oldData.routineId,
        dateCreate: oldData.dateCreate,
        state: newData.state
    } as response_routine_trakin_type;
};

export const deleteRoutineTrakingByIdService = async (userId: string, routineTrakingId: string) => {
    const res = await routineTrakingModel.deleteOne({ _id: routineTrakingId, userId: userId });
    if(res.deletedCount === 0) throw { code: 400, message: 'Routine traking is delete' } as ErrorType;
};

export const completeRoutineTrakingByIsActiveService = async (idUser: string) => {
    await routineTrakingModel.updateMany({userId: idUser, state: 'active'}, {state: 'completed'});
};


