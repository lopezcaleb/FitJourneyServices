import express from 'express';
import routerAdmin from './v1/routesAdmin';
import routerUser from './v1/routesUser';

const signature = '/v1/fitjourney'
export const routesV1 = (app: express.Application) => {
    app.use(`${signature}/admin/`, routerAdmin);
    app.use(`${signature}/user/`, routerUser);
};