import {  Request, Response, NextFunction } from 'express';
import { ErrorException } from '../utils/errorUtil';
import { ErrorType } from '../types/error.type';
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

// Add userId to request express
declare global {
    namespace Express {
        interface Request {
            token: string;
            userId: string;
            username: string;
            email: string;
            rol: string;
        }
    }
}

// Validate if token is valid in this app
export const  checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const secretKey = process.env.SECRET_KEY
        const token = req.header('Authorization');
        
        if(!token){
            res.status( 401 ).send({error: 'Token not found'});
        }

        const tokenData = jwt.verify(token, secretKey);

        if (tokenData.id) {
            next();
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).send({ message: 'Token expired' });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send({ message: 'Invalid token' });
        }
        else if (error instanceof jwt.NotBeforeError) {
            res.status(401).send({ message: 'Token not active yet' });
        }
        else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
}

// Get token info
export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization');
    if (!token) res.status(401).json({ error: 'Access denied' });
        try {
            const secretKey = process.env.SECRET_KEY
            const decoded = jwt.verify(token, secretKey);

            if (!mongoose.isValidObjectId(decoded.id)) throw { code: 400, message: 'token invalid: user id is not valid' } as ErrorType;
            if (decoded.username === undefined) throw { code: 400, message: 'token invalid: username is not valid' } as ErrorType;
            if (decoded.email === undefined) throw { code: 400, message: 'token invalid: email is not valid' } as ErrorType;
            if (decoded.rol === undefined) throw { code: 400, message: 'rol invalid: username is not valid' } as ErrorType;

            req.token = token!;
            req.userId = decoded.id;
            req.username = decoded.username;
            req.email = decoded.email;
            req.rol = decoded.rol;
            next();
        } catch (error) {
            ErrorException(res, error);
        }
};

// Validate user rol
type RolType = 'admin' | 'user';

export const checkRolAuth = (roles: RolType[] ) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.rol === undefined) throw { code: 400, message: 'rol invalid: username is not valid' };

        const rol: RolType = req.rol === 'admin' ? 'admin': 'user';

        if (roles.includes(rol)){
            next();
        }else{
            res.status(409);
            res.send({error: 'you dont have permission'});
        }
    } catch (error) {
        ErrorException(res, error);
    }
}