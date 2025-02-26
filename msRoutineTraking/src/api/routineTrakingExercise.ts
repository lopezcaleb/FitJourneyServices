import { isAxiosError } from "axios";
import { routineTrakingExerciseApiConfig } from "../config/api/routineTrakingExercise.config.api";
import { ErrorType } from "../types/error.type";
import { RequestInsertRoutineTrakingExercise, ResponseInsertRoutineTrakingExercise } from "../types/routineTrakingExercise.type";

export class routineTrakingExerciseApi {
    static insertRoutineTrakingExercise = async (token: string, dataInsert: RequestInsertRoutineTrakingExercise) => {
        try {
            const { data } = await routineTrakingExerciseApiConfig.post<ResponseInsertRoutineTrakingExercise>("/", 
                dataInsert, 
                { headers: { Authorization: token } }
            );
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