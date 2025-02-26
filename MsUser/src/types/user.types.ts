  export interface UserType {
    id: string;
    username: string;
    email: string;
    rol: 'admin' | 'user'
  }

  export interface UserDataType  extends UserType{
    password: string;
  }