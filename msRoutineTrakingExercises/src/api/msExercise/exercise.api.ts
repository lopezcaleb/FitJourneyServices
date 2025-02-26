import axios from 'axios';
import { ApiErrorType, ErrorType } from '../../types/error.type';
import { ExerciseType } from '../../types/exercise.types';

export const GetExerciseById = async (token: string, id: string): Promise<ExerciseType> => {
    const host = process.env.MS_JOURNEY_MS_EXERCISE;
    return await axios.get<ExerciseType>(
            `${host}?id=${id}`, {
            headers: {
                Authorization: token
            }
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error.response);
            if(error.status == 422){
                throw { code: 422, message: 'the server was unable to process the request because it contains invalid data' } as ErrorType;
            }
            else if (error.response && error.response.data) {
                
                const errorVal = error.response.data as ApiErrorType;
                throw { code: error.status, message: errorVal.message } as ApiErrorType;
            }
            throw { code: 500, message: 'internal server error' } as ErrorType;
        })
}