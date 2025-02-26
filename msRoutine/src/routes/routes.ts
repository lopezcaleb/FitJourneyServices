import {Application} from 'express'
import { routeRoutine } from './v1/routesRoutine';

export const routesV1 = (app: Application) => {
    const signature = '/v1/fitjourney'
    app.use(`${signature}/routine/`, routeRoutine);
}