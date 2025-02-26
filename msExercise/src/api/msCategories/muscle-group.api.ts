import { isAxiosError } from 'axios';
import { ErrorType } from '../../types/error.type';
import { CategoriesMuscleGroupType } from '../../types/categoriesMuscleGroup.types';
import { categoriesMuscleGroupApiConfig } from '../../config/config/categoriesApi.config';


export class muscleGroupApi {
    static getMusclegroupIdById = async (token: string, id: string): Promise<CategoriesMuscleGroupType> => {
        try {
            const { data } = await categoriesMuscleGroupApiConfig.get<CategoriesMuscleGroupType>(`?id=${id}`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                
                throw { code: error.response?.status, message: error.response?.data.message } as ErrorType
            }
            throw { code: 500, message: 'Internal server error' } as ErrorType
        }
    }

    static getAllMusclegroups = async (token: string): Promise<CategoriesMuscleGroupType[]> => {
        try {
            const { data } = await categoriesMuscleGroupApiConfig.get<CategoriesMuscleGroupType[]>(`/all`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw { code: error.response?.status, message: error.response?.data.message } as ErrorType
            }
            throw { code: 500, message: 'Internal server error' } as ErrorType
        }
    }
}