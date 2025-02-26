import {Router} from 'express';
import { auth, checkToken } from '../../controller/authControler';
import schemaValidator from '../../middleware/schemaValidator';

export const routesAuth = Router();

routesAuth.post('/', schemaValidator("/auth"), auth);
routesAuth.get('/check-status', checkToken);