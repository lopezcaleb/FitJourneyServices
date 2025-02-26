import Joi, { ObjectSchema } from "joi";

const ExerciseIdSchema = Joi.object().keys({
  id: Joi.string().min(24).max(24).required(),
});

const ExerciseFilterSchema = Joi.object().keys({
  muscleGroupId: Joi.string().min(24).max(24).optional(),
  trainingStyleId: Joi.string().min(24).max(24).optional(),
});

const ExerciseRegisterSchema = Joi.object().keys({
  name: Joi.string().min(1).max(50).required(),
  muscleGroupId: Joi.string().min(24).max(24).required(),
  trainingStyleId: Joi.string().min(24).max(24).required(),
  imageUrl: Joi.string().min(1).max(500).required(),
  details: Joi.string().min(1).max(2050).required(),
});

const ExerciseUpdateSchema = Joi.object().keys({
  name: Joi.string().min(1).max(50).optional(),
  imageUrl: Joi.string().min(1).max(500).optional(),
  details: Joi.string().min(1).max(2050).optional(),
});

export default {
  "/excercise/id": ExerciseIdSchema,
  "/excercise/filter": ExerciseFilterSchema,
  "/excercise/register": ExerciseRegisterSchema,
  "/excercise/update": ExerciseUpdateSchema,
} as { [key: string]: ObjectSchema };
