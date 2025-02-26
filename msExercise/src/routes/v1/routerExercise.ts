import { Router } from 'express';
import { checkAuth, checkRolAuth, verifyToken } from '../../middleware/authMiddleware';
import schemaValidator from '../../middleware/schemaValidator';
import { AddExercisesSeed, DeleteExercise, GetAllExercise, GetExercise, InsertExercise, UpdateExercise } from '../../controller/exerciseController';

const routersExercise = Router();

routersExercise.get(
    '/all',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/excercise/filter', true, 'query'),
    GetAllExercise
);

routersExercise.get(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/excercise/id', true, 'query'),
    GetExercise
);

routersExercise.post(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    schemaValidator('/excercise/register'),
    InsertExercise
);

routersExercise.post(
    '/add_seed',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin']),
    AddExercisesSeed
);

routersExercise.put(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin',]),
    schemaValidator('/excercise/id', true, 'query'),
    schemaValidator('/excercise/update'),
    UpdateExercise
);

routersExercise.delete(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin',]),
    schemaValidator('/excercise/id', true, 'query'),
    DeleteExercise
);

export default routersExercise;