import { Application }  from "express";
import routersExercise from "./v1/routerExercise";

export const routesV1 = (app: Application) => {
    const signature = "/v1/fitjourney";
    app.use(`${signature}/exercise`, routersExercise);
}