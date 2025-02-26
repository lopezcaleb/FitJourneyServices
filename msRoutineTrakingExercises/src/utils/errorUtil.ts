import { Response } from 'express';

import { type ErrorType } from "../types/error.type";

export const ErrorException = (res: Response, error: any) => {
    console.log(error);
    
    if (typeof error === "object" && error !== null && "message" in error && "code" in error) {
      const typedError = error as ErrorType;
      res.status(typedError.code).send({message: typedError.message})
    } else {
      res.status(500).send({message: 'Internal server error'})
    }
  }