import { RequestHandler } from "express";
import schemas from "../schemas";

interface ValidationError {
  message: string;
  type: string;
}

interface JoiError {
  status: string;
  error: {
    original: unknown;
    details: ValidationError[];
  };
}

interface CustomError {
  status: string;
  error: string;
}

const supportedMethods = ["post", "put", "patch", "delete", "get"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

type ValidateType = "body" | "query"

const schemaValidator = (path: string, useJoiError = true, validateType: ValidateType = "body"): RequestHandler => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate((validateType==='body') ? req.body : req.query, validationOptions);

    if (error) {
      const customError: CustomError = {
        status: "failed",
        error: "Invalid request. Please review request and try again.",
      };

      const joiError: JoiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details.map(({ message, type }: ValidationError) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };
      return next(
        res.status(422).json(useJoiError ? joiError : customError)
      );
    }

    // validation successful
    (validateType === 'body') ? req.body :  req.query = value
     
    return next();
  };
};

export default schemaValidator;