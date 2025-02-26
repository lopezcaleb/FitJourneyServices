import { msExerciseConfig } from "../config/msExercise.config"
import { ErrorType } from "../types/error.type";
import { type ExerciseType } from "../types/exercise.type";

export class msExercise {
    static getExerciseById = async (id: string, token: string): Promise<ExerciseType> => {
        const {data} = await msExerciseConfig.get<ExerciseType>(`?id=${id}`, {
            headers: {
                "Authorization": token
            }
        });
        return data;
    }
}