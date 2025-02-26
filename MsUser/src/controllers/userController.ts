import {Request, Response} from 'express';
import { DeleteUserService, GetUserByEmailService, GetUserByIdService, GetUserByUserNameService, RegisterUserService, UpdateUserServie } from '../services/user.service';
import { ErrorException } from '../utils/errorUtil';
import { UserDataType, UserType } from '../types/user.types';
import { validationObjectIsEmpty } from '../utils/validationUtil';
import { ErrorType } from '../types/error.type';
import { encryptPassword } from '../utils/passwordUtil';

export const GetUser = async (req: Request, res: Response) => {
    try {
        const id = req.userId || '';

        const user = await GetUserByIdService(id);
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            rol: user.rol
          } as UserType);
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const RegisterUser = async (req: Request<{}, {}, UserDataType, {}>, res: Response) => {
    try {
      const data = req.body;
  
      const existUserName = await GetUserByUserNameService(data.username);
      if(!validationObjectIsEmpty(existUserName)) throw {code: 400, message: 'username alredy exist'} as ErrorType;
      
      const existEmail = await GetUserByEmailService(data.email);
      if(!validationObjectIsEmpty(existEmail)) throw {code: 400, message: 'email alredy exist'} as ErrorType;
  
      // Hash password
      const hash = await encryptPassword(data.password);
  
      res.status(201).send( 
        await RegisterUserService({...data, password: hash, rol: 'user'})
      );
    } catch (error) {
      ErrorException(res, error);
    }
  }

export const UpdateUser = async ( req: Request<{}, {}, UserType, {}>, res: Response ) => {
    try {
        const id = req.userId || '';
        const data = req.body;

        const existUserName = await GetUserByUserNameService(data.username);
        if(!validationObjectIsEmpty(existUserName)) throw {code: 400, message: 'username alredy exist'} as ErrorType;
        
        const existEmail = await GetUserByEmailService(data.email);
        if(!validationObjectIsEmpty(existEmail)) throw {code: 400, message: 'email alredy exist'} as ErrorType;

        const oldData = await GetUserByIdService(id);
        const updateUser = await UpdateUserServie(id, data, oldData);
        res.status(200).send(updateUser);
    } catch (error) {
        ErrorException(res, error);    
    }
}

export const DeleteUser = async ( req: Request, res: Response ) => {
    try {
        const id = req.userId || '';
        await DeleteUserService(id);
        res.status(200);
    } catch (error) {
        ErrorException(res, error);
    }
}