import { categoriesTrainingStylesModel } from "../schemas/CategoriesTrainingStyles.schema";
import { CategoriesTrainingStylesType } from "../types/categoriesTrainingStyle.types";
import { ErrorType } from "../types/error.type";

export const GetAllCategoriesTrainingStylesService = async(): Promise<CategoriesTrainingStylesType[]> => {
    const res = await categoriesTrainingStylesModel.find();
    const resList: CategoriesTrainingStylesType[] =  res.map((item) => ({
        id: item.id,
        name: item.name || '',
        details: item.details || ''
    }))
    return resList;
}

export const GetCategoriesTrainingStylesByIdService = async(id: string) => {
    const res = await categoriesTrainingStylesModel.findOne({_id: id});
    if ( res === null ) throw { code: 404, message: 'category not found' } as ErrorType;
    return {
        id: res.id,
        name: res.name,
        details: res.details
    } as CategoriesTrainingStylesType;
}

export const GetCategoriesTrainingStylesByNameService = async(name: string) => {
    const res = await categoriesTrainingStylesModel.findOne({name: name});
    if ( res === null )  return {} as CategoriesTrainingStylesType;
    return {
        id: res.id,
        name: res.name,
        details: res.details
    } as CategoriesTrainingStylesType;
}

export const InsertCategoriesTrainingStylesService = async(data: CategoriesTrainingStylesType) => {
    const category = new categoriesTrainingStylesModel(data);
    const res = await category.save();
    if(!res) throw { code: 400, message: 'error to insert' } as ErrorType;

    return {
        id: category._id.toString(),
        name: data.name,
        details: data.details
    } as CategoriesTrainingStylesType;
}

export const UpdateCategoriesTrainingStylesService = async(id: string, newData: CategoriesTrainingStylesType, oldData: CategoriesTrainingStylesType): Promise<CategoriesTrainingStylesType> => {
    var categorie = {
        ...oldData,
        name: newData.name != undefined ? newData.name : oldData.name,
        details: newData.details != undefined ? newData.details : oldData.details,
    } as CategoriesTrainingStylesType;

    await categoriesTrainingStylesModel.updateOne({_id: id},categorie);

    return categorie;
}

export const DeleteCategoriesTrainingStylesService = async(id: string) => {
    const categoriDelete = await categoriesTrainingStylesModel.deleteOne({_id: id});
    if(categoriDelete.deletedCount <= 0) throw { code: 400, message: 'error to delete category' } as ErrorType;
}