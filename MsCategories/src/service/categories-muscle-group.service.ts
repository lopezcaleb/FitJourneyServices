import { categoriesMuscleGroupModel } from "../schemas/CategoriesMuscleGroup.schema";
import { CategoriesMuscleGroupType } from "../types/categoriesMuscleGroup.types";
import { ErrorType } from "../types/error.type";

export const GetAllCategoriesMuscleGroupService = async(trainingStylesId?: string): Promise<CategoriesMuscleGroupType[]> => {
    var filter = {};

    trainingStylesId != undefined ? 
        filter = 
        {
            ...filter,
            trainingStylesId: trainingStylesId
        } : 
        filter;

    const res = await categoriesMuscleGroupModel.find(filter);

    const resList: CategoriesMuscleGroupType[] =  res.map((item) => ({
        id: item.id,
        name: item.name || '',
        details: item.details || ''
    }))
    return resList;
}

export const GetCategoriesMuscleGroupByIdService = async(id: string) => {
    const res = await categoriesMuscleGroupModel.findOne({_id: id});
    if ( res === null ) throw { code: 404, message: 'category not found' } as ErrorType;
    return {
        id: res.id,
        name: res.name,
        details: res.details
    } as CategoriesMuscleGroupType;
}

export const GetCategoriesMuscleGroupByNameService = async(name: string) => {
   
    const res = await categoriesMuscleGroupModel.findOne({name: name});
    if ( res === null )  return {} as CategoriesMuscleGroupType;
    return {
        id: res.id,
        name: res.name,
        details: res.details
    } as CategoriesMuscleGroupType;
}

export const InsertCategoriesMuscleGroupService = async(data: CategoriesMuscleGroupType) => {
    const category = new categoriesMuscleGroupModel(data);
    const res = await category.save();
    if(!res) throw { code: 400, message: 'error to insert' } as ErrorType;

    return {
        id: category._id.toString(),
        name: data.name,
        details: data.details
    } as CategoriesMuscleGroupType;
}

export const UpdateCategoriesMuscleGroupService = async(id: string, newData: CategoriesMuscleGroupType, oldData: CategoriesMuscleGroupType): Promise<CategoriesMuscleGroupType> => {
    var categorie = {
        ...oldData,
        name: newData.name != undefined ? newData.name : oldData.name,
        details: newData.details != undefined ? newData.details : oldData.details,
    } as CategoriesMuscleGroupType;

    await categoriesMuscleGroupModel.updateOne({_id: id},categorie);

    return categorie;
}

export const DeleteCategoriesMuscleGroupService = async(id: string) => {
    const categoriDelete = await categoriesMuscleGroupModel.deleteOne({_id: id});
    if(categoriDelete.deletedCount <= 0) throw { code: 400, message: 'error to delete category' } as ErrorType;
}