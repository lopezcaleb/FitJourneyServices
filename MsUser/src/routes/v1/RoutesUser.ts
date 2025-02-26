import {Router} from 'express';
import { DeleteUser, GetUser, RegisterUser, UpdateUser } from '../../controllers/userController';
import { checkAuth, checkRolAuth, verifyToken } from '../../middleware/authMiddleware';
import schemaValidator from '../../middleware/schemaValidator';

const routerUser = Router();

routerUser.get(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']), 
    GetUser
);

routerUser.post(
    '/', 
    schemaValidator("/user/data"), 
    RegisterUser
);

routerUser.put('/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']), 
    schemaValidator("/admin/update"), 
    UpdateUser,
);

routerUser.delete('/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']), 
    schemaValidator("/admin/get"), 
    DeleteUser,
);


export default routerUser;