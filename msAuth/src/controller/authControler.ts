import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

import { ErrorException } from "../utils/errorsUtil";
import { comparePassword } from "../types/passwordUtil";
import { authService } from "../services/auth.service";

export const auth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await authService(username);

    if (!(await comparePassword(password, user.password)))
      res.status(401).json({ error: "the password is not correct" });

    const dataUserToken = {
      id: user.id,
      username: user.userName,
      email: user.email,
      rol: user.rol,
    };

    const token = createToken(dataUserToken);

    res.status(200).json({ user: dataUserToken, token });
  } catch (error) {
    ErrorException(res, error);
  }
};

export const checkToken = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  const token = req.headers['authorization'];
    try {
      if(token === undefined){
        res.status(401).send({ message: 'Token not found' });
      }else {
        const decode = jwt.verify( token, process.env.SECRET_KEY );

        const dataUserToken = {
          id: decode.id,
          username: decode.username,
          email: decode.email,
          rol: decode.rol,
        };
    

        res.status(200).send({user: dataUserToken, token});
      }
    } catch (error) {
      
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).send({ message: 'Token expired' });
      }
      else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).send({ message: 'Invalid token' });
      }
      else if (error instanceof jwt.NotBeforeError) {
        res.status(401).send({ message: 'Token not active yet' });
      } else {
        res.status(500).send({ message: 'Internal server error.' });
      }
    }
}

// Create token with the data
const createToken = (data: object) => {
  try {
      const secretKey = process.env.SECRET_KEY
      const token = jwt.sign(
          data,
          secretKey, {
              expiresIn: '1h',
          }
      );
      return token;
  } catch (error) {
      throw { message: `Error to create tooken`, code: 500 };
  }
}