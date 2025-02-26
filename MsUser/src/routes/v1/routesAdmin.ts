import express from 'express';


import { DeleteUser, GetAllUsers, GetUserById, RegisterUser, UpdateUser } from '../../controllers/adminContoller';
import schemaValidator from '../../middleware/schemaValidator';
import { checkAuth, checkRolAuth, verifyToken } from '../../middleware/authMiddleware';

const routerAdmin = express.Router();

routerAdmin.get(
    '/all',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/admin/filter", true, 'query'), 
    GetAllUsers
);

routerAdmin.get(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/admin/get", true, 'query'), 
    GetUserById
);

routerAdmin.post(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/admin/data"), 
    RegisterUser
);

routerAdmin.put(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/admin/update"), 
    UpdateUser
);

routerAdmin.delete(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator("/admin/get", true, 'query'), 
    DeleteUser
);

export default routerAdmin;