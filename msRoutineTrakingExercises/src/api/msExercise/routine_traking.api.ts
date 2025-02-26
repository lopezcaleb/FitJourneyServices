import { isAxiosError } from 'axios';
import { ErrorType } from '../../types/error.type';
import { routineTrakingType } from '../../types/routine_traking.types';
import { rotineTrakingnConfig } from '../../config/api/routineTrakingConfig';

export class routineTrakingApi {
    static getRoutineTraking = async (id:string, token: string) => {
        try {
            const {data} = await rotineTrakingnConfig.get<routineTrakingType>(`?id=${id}`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (error) {
            if(isAxiosError(error)) throw {code: 400, message: error.response?.data.message } as ErrorType;
            throw {code: 500, message: "Internal server error" } as ErrorType;
        }
    }
}