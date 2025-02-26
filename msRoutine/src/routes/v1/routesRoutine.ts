import { Router } from 'express';
import { addExerciseToRoutine, deleteExercisesFromRoutineById, deleteRoutine, getAllRoutine, getRoutine, insertRoutine, updateRoutine } from '../../controllers/routineController';
import { checkAuth, checkRolAuth, verifyToken } from '../../middleware/authMiddleware';
import schemaValidator from '../../middleware/schemaValidator';

export const routeRoutine = Router();

routeRoutine.get(
    '/all',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/filter', true, 'query'),
    getAllRoutine
);

routeRoutine.get(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/id', true, 'query'),
    getRoutine
);

routeRoutine.post(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/insert'),
    insertRoutine
);

routeRoutine.patch(
    '/add_exercise_routine',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/id', true, 'query'),
    schemaValidator('/routine/addExerciseToRoutine'),
    addExerciseToRoutine
);

routeRoutine.delete(
    '/delete_exercise_routine',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/id', true, 'query'),
    schemaValidator('/routine/deleteExerciseToRoutine'),
    deleteExercisesFromRoutineById
);

routeRoutine.put(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/id', true, 'query'),
    schemaValidator('/routine/update'),
    updateRoutine
);

routeRoutine.delete(
    '/',
    checkAuth,
    verifyToken,
    checkRolAuth(['admin', 'user']),
    schemaValidator('/routine/id', true, 'query'),
    deleteRoutine
);