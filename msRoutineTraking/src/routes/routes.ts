import { Application } from "express"
import { routerRoutineTraking } from "./v1/routeRoutineTraking";

const signature = "/v1/fitjourney";

export const routesV1 = (app: Application) => {
    app.use(`${signature}/routine_traking`, routerRoutineTraking);
} 