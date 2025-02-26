import { isAxiosError } from 'axios';
import { ErrorType } from '../../types/error.type';
import { CategoriesTrainingStyleType } from '../../types/CategoriesTrainingStyleType.types';
import { categoriesTrainingStyleApiConfig } from '../../config/config/categoriesApi.config';

export class trainingStyleApi {
    static getTrainingStyleIdById = async (token: string, id: string): Promise<CategoriesTrainingStyleType> => {
        try {
            const { data } = await categoriesTrainingStyleApiConfig.get<CategoriesTrainingStyleType>(`?id=${id}`, {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error.request);
                
                throw { code: error.response?.status, message: error.response?.data.message } as ErrorType
            }
            throw { code: 500, message: 'Internal server error' } as ErrorType
        }
    }

    static getallTrainingStyles = async (token: string): Promise<CategoriesTrainingStyleType[]> => {
        try {
            const { data } = await categoriesTrainingStyleApiConfig.get<CategoriesTrainingStyleType[]>(`/all`, {
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