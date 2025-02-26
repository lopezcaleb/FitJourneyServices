import axios from "axios";

export const trainingStyleBaseUrl = process.env.MS_JOURNEY_MS_TRAINING_STYLE;

export const categoriesMuscleGroupApiConfig = axios.create({
    baseURL: trainingStyleBaseUrl
});

export const categoriesTrainingStyleApiConfig = axios.create({
    baseURL: trainingStyleBaseUrl
});