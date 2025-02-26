import Joi, { ObjectSchema } from "joi";

const rouExceFilter= Joi.object().keys({
    limit: Joi.number().min(0).max(50),
    offset: Joi.number().min(1),
    routineTrakingId: Joi.string().min(24).max(24),
});

const rouExceId = Joi.object().keys({
    id: Joi.string().min(24).max(6240).required(),
});
const rouExceInsert = Joi.object({
  routineTrakingId: Joi.string().length(24).required(),
  exerciseId: Joi.string().length(24).required()
});

const seriesTypeSchema = Joi.object({
  repetitions: Joi.number().min(0).max(500),
  weight: Joi.number().min(0).max(6240),
  time: Joi.number().min(0).max(6240),
});


const addSerie = Joi.object({
  series: Joi.array().items(seriesTypeSchema).required(),
});

export default {
  "/routineExer/filter": rouExceFilter,
  "/routineExer/id": rouExceId,
  "/routineExer/insert": rouExceInsert,
  "/routineExer/add_serie": addSerie,
} as { [key: string]: ObjectSchema };
