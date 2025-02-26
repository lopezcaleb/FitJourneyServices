import {  Request, Response } from 'express';
import { UserDataType, UserType } from '../types/user.types';
import { DeleteUserService, GetAllUsersService, GetUserByEmailService, GetUserByIdService, GetUserByUserNameService, RegisterUserService, UpdateUserServie } from '../services/user.service';
import { encryptPassword } from '../utils/passwordUtil';
import { type ErrorType } from '../types/error.type';
import mongoose from 'mongoose';
import { ErrorException } from '../utils/errorUtil';
import { validationObjectIsEmpty } from '../utils/validationUtil';

export const GetAllUsers = async (req: Request<{}, {}, {}, {rol?: string, limit: string, offset: string }>, res: Response) => {
  try {
      const {rol, limit, offset} = req.query;

      const rolVal = typeof(rol) == 'string' ? rol : undefined;
      const limitValue = limit != undefined ? Number(limit) : 10;
      const offsetValue = offset != undefined ? Number(offset) : 1;

      const userList = await GetAllUsersService(limitValue, offsetValue, rolVal);
      res.status(200).send(userList);
  } catch (error) {
      ErrorException(res, error);
  }
}

export const RegisterUser = async (req: Request<{}, {}, UserDataType>, res: Response) => {
  try {
    const data = req.body;

    const existUserName = await GetUserByUserNameService(data.username);
    if(!validationObjectIsEmpty(existUserName)) throw {code: 400, message: 'username alredy exist'} as ErrorType;
    
    const existEmail = await GetUserByEmailService(data.email);
    if(!validationObjectIsEmpty(existEmail)) throw {code: 400, message: 'email alredy exist'} as ErrorType;

    // Hash password
    const hash = await encryptPassword(data.password);

    res.status(201).send( 
      await RegisterUserService({...data, password: hash})
    );
  } catch (error) {
    ErrorException(res, error);
  }
}

export const GetUserById = async (req: Request<{}, {}, {}, {id: string}>, res: Response) => {
  try {
    const {id} = req.query;
    if (typeof id === "string" && mongoose.isValidObjectId(id)) {
      const user = await GetUserByIdService(id);
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        rol: user.rol
      } as UserType);
    } else {
      res.status(400).send({ error: "Parameter id is not valid" });
    }
  } catch (error) {
    ErrorException(res, error);
  }
}

export const UpdateUser = async ( req: Request<{}, {}, UserType, {id: string}>, res: Response ) => {
  try {
    
      const {id} = req.query;
      const data = req.body;

      if (typeof id === "string" && mongoose.isValidObjectId(id)) {
        const existUserName = await GetUserByUserNameService(data.username);
        if(!validationObjectIsEmpty(existUserName)) throw {code: 400, message: 'username alredy exist'} as ErrorType;
        
        const existEmail = await GetUserByEmailService(data.email);
        if(!validationObjectIsEmpty(existEmail)) throw {code: 400, message: 'email alredy exist'} as ErrorType;

        const oldData = await GetUserByIdService(id);
        const updateUser = await UpdateUserServie(id, data, oldData);
        res.status(200).send(updateUser);
      }else {
        res.status(400).send({ error: "Parameter id is not valid" });
      }
  } catch (error) {
      ErrorException(res, error);    
  }
}

export const DeleteUser = async ( req: Request<{}, {}, {}, {id: string}>, res: Response ) => {
  try {
    const {id} = req.query;
    if (typeof id === "string" && mongoose.isValidObjectId(id)) {
      await DeleteUserService(id);
      res.status(200).send();
    }else {
      res.status(400).send({ error: "Parameter id is not valid" });
    }
  } catch (error) {
      ErrorException(res, error);
  }
}
