import { Router } from "express";
import { checkAuth, checkRolAuth, verifyToken } from "../../middleware/authMiddleware";
import schemaValidator from "../../middleware/schemaValidator";
import { deleteRoutineTraking, getAllRoutinesTraking, getRoutineTraking, insertRoutineTraking, updateRoutineTraking } from "../../controllers/routineTrakingController";
export const routerRoutineTraking = Router();

routerRoutineTraking.get(
    '/all', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator("/routineTraking/filter", true, "query"), 
    getAllRoutinesTraking
);

routerRoutineTraking.get(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator("/routineTraking/id", true, "query"), 
    getRoutineTraking
);

routerRoutineTraking.post(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator("/routineTraking/insert"), 
    insertRoutineTraking
);

routerRoutineTraking.put(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator("/routineTraking/id", true, "query"), 
    schemaValidator("/routineTraking/update"), 
    updateRoutineTraking
);

routerRoutineTraking.delete(
    '/', 
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator("/routineTraking/id", true, "query"), 
    deleteRoutineTraking
);