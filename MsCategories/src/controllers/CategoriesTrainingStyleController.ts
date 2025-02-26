import {Request, Response} from 'express';
import { DeleteCategoriesTrainingStylesService, GetAllCategoriesTrainingStylesService, GetCategoriesTrainingStylesByIdService, GetCategoriesTrainingStylesByNameService, InsertCategoriesTrainingStylesService, UpdateCategoriesTrainingStylesService } from '../service/categories-training-style.service';
import { ErrorException } from '../utils/errorUtil';
import { CategoriesTrainingStylesType } from '../types/categoriesTrainingStyle.types';
import { validationObjectIsEmpty } from '../utils/validationUtil';
import { ErrorType } from '../types/error.type';
import { categoriesSeeds } from '../seeds/categoriesSeeds';

export const GetAllCategoriesTrainingStyles = async(req: Request<{}, {}, {}, {}>, res: Response) => {
    try {
        res.status(200).send(await GetAllCategoriesTrainingStylesService());
    } catch (error) {
        ErrorException(res, error);
    }
}

export const GetCategoriesTrainingStyle = async(req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        res.status(200).send( await GetCategoriesTrainingStylesByIdService(id) );
    } catch (error) {
        
        ErrorException(res, error);
    }
}

export const InsertCategoriesTrainingStyle = async(req: Request<{}, {}, CategoriesTrainingStylesType, {}>, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        
        
        const existName = await GetCategoriesTrainingStylesByNameService(data.name);
        if(!validationObjectIsEmpty(existName)) throw {code: 400, message: 'category alredy exist'} as ErrorType;

        res.status(201).send(await InsertCategoriesTrainingStylesService(data));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const UpdateCategoriesTrainingStyle = async(req: Request<{}, {}, CategoriesTrainingStylesType, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        const newData = req.body;

        const oldData = await GetCategoriesTrainingStylesByIdService(id);

        if(newData.name != undefined){
            const existName = await GetCategoriesTrainingStylesByNameService(newData.name);
            if(!validationObjectIsEmpty(existName)) throw {code: 400, message: 'category name alredy exist'} as ErrorType;
        }

        res.status(200).send(await UpdateCategoriesTrainingStylesService(id, newData, oldData));
    } catch (error) {
        ErrorException(res, error);
    }
}

export const DeleteCategoriesTrainingStyle = async(req: Request<{}, {}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.query;
        await GetCategoriesTrainingStylesByIdService(id);
        await DeleteCategoriesTrainingStylesService(id);
        res.status(200).send();
    } catch (error) {
        ErrorException(res, error);
    }
}

export const AddCategoriesTrainingStyleSeed = async (req: Request, res: Response) => {
    try {
        const categories = categoriesSeeds.trainingStyleSeed();
        categories.map(async item => {
            const existName = await GetCategoriesTrainingStylesByNameService(item.name);
            if(validationObjectIsEmpty(existName)) InsertCategoriesTrainingStylesService(item);
        });
        
        res.status(201).send(categories);
    } catch (error) {
        ErrorException(res, error);
    }
}