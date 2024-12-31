export interface UserBase {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface User extends UserBase {
  id: number;
  createdAt?: Date;
}

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export interface UserCreate extends UserBase {
  password: string;
}

export type UserUpdate = Partial<UserCreate>;
