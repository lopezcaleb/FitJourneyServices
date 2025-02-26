import express from 'express';
import { routesAuth } from './v1/authRoute';

export const authRoutes = (app: express.Application) => {
    const signature = '/v1/fitjourney';
    app.use(`${signature}/auth`, routesAuth)
}