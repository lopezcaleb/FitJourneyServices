export interface UserType {
    id: string;
    userName: string;
    email: string;
    rol: "admin" | "user"
} 

export interface UserDataType extends UserType {
    password: string;
}