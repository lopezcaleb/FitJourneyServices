import Joi, { ObjectSchema } from "joi";

const routineId = Joi.object().keys({
    id: Joi.string().min(24).max(24).required(),
});

const routineFilter = Joi.object().keys({
    limit: Joi.number().min(0).max(50).optional(),
    offset: Joi.number().min(1),
});

const routineInsert = Joi.object().keys({
    name: Joi.string().min(3).max(60),
    exercises: Joi.array().items(Joi.string())
});

const routineUpdate = Joi.object().keys({
    name: Joi.string().min(3).max(60),
    exercises: Joi.array().items(Joi.string())
});

const addExerciseToRoutine = Joi.object().keys({
    exercises: Joi.array().items(Joi.string())
});

const deleteExerciseToRoutine = Joi.object().keys({
    exercises: Joi.array().items(Joi.string())
});

export default {
  "/routine/id": routineId,
  "/routine/filter": routineFilter,
  "/routine/insert": routineInsert,
  "/routine/update": routineUpdate,
  "/routine/addExerciseToRoutine": addExerciseToRoutine,
  "/routine/deleteExerciseToRoutine": deleteExerciseToRoutine,
} as { [key: string]: ObjectSchema };
