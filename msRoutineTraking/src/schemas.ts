import Joi, { ObjectSchema } from "joi";

const filter = Joi.object().keys({
  limit: Joi.number().min(0).max(50),
  offset: Joi.number().min(1),
  routineId: Joi.string().min(24).max(24),
  state: Joi.string().valid('create', 'active', 'completed'),
});

const validateId = Joi.object().keys({
  id: Joi.string().min(24).max(24).required(),
});

const routineTrakingInsert = Joi.object().keys({
  routineId: Joi.string().min(24).max(24).required(),
  state: Joi.string().valid('create', 'active', 'completed'),
});

const routineTrakingUpdate = Joi.object().keys({
  state: Joi.string().valid('active', 'completed'),
});

export default {
  '/routineTraking/filter': filter,
  "/routineTraking/id": validateId,
  "/routineTraking/insert": routineTrakingInsert,
  "/routineTraking/update": routineTrakingUpdate,
} as { [key: string]: ObjectSchema };
