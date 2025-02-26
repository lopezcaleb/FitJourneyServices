import express from 'express';

import routersCategoriesMuscleGroup from "./v1/routesCategoriesMuscleGroup";
import routesCategoriesTrainingStyles from "./v1/routesCategoriesTrainingStyles";

const signature = '/v1/fitjourney'
export const routesV1 = (app: express.Application) => {
    app.use(`${signature}/categories_training_style/`, routesCategoriesTrainingStyles);
    app.use(`${signature}/categories_muscle_group/`, routersCategoriesMuscleGroup);
}