import { Router } from 'express';
import { checkAuth, checkRolAuth, verifyToken } from '../../middleware/authMiddleware';
import { AddCategoriesMuscleGroupSeed, DeleteCategoriesMuscleGroup, GetAllCategoriesMuscleGroup, GetCategoriesMuscleGroup, InsertCategoriesMuscleGroup, UpdateCategoriesMuscleGroup } from '../../controllers/CategoriesMuscleGroupController';
import schemaValidator from '../../middleware/schemaValidator';

const routersCategoriesMuscleGroup = Router();

routersCategoriesMuscleGroup.get(
    '/all',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/categoriestrainingArea/filter", true, 'query'), 
    GetAllCategoriesMuscleGroup
);

routersCategoriesMuscleGroup.get(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/CategoriesTraining/id", true, 'query'), 
    GetCategoriesMuscleGroup
);

routersCategoriesMuscleGroup.post(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/categoriestrainingArea/data"), 
    InsertCategoriesMuscleGroup
);

routersCategoriesMuscleGroup.post(
    '/add_seeds',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    AddCategoriesMuscleGroupSeed
);

routersCategoriesMuscleGroup.put(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/CategoriesTraining/id", true, 'query'), 
    schemaValidator("/categoriestrainingArea/data/update"), 
    UpdateCategoriesMuscleGroup
);

routersCategoriesMuscleGroup.delete(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/CategoriesTraining/id", true, 'query'), 
    DeleteCategoriesMuscleGroup
);

export default routersCategoriesMuscleGroup;