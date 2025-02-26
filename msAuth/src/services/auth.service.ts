import { authModel } from "../schemas/auth.schema"
import { ErrorType } from "../types/error.type";
import { UserDataType } from "../types/user.type";

export const authService = async (userName: string): Promise<UserDataType> => {
    
    const res = await authModel.findOne({username: userName});
    if(res === null) throw { code: 404, message: 'user not found' } as ErrorType;
    return {
        id: res._id.toString(),
        userName: res.username,
        email: res.email,
        password: res.password,
        rol: res.rol
    } as UserDataType;
}