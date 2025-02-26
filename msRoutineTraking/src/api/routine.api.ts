import { isAxiosError } from "axios";
import { routineApiConfig } from "../config/api/routine.config.api";
import { RoutineType } from "../types/routine.type";
import { ErrorType } from "../types/error.type";

export class routineApi {
    static getRoutineById = async (id: string, token: string) => {
        try {
            const {data} = await routineApiConfig<RoutineType>(`?id=${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            return data;
        } catch (error) {
            if(isAxiosError(error)) {
                console.log(error);
                throw {code: 400, message: error.response?.data.message} as ErrorType;
            }
            throw {code: 500, message: "Internal server error"} as ErrorType;
        }
    }
}