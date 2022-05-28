import { UserType } from '@prisma/client';

export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  userType: UserType;
  image?: {
    public_id: string;
    secure_url: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserResponse {
  user: IUser;
}

export interface IUserImage {
  id?: number;
  public_id: string;
  secure_id: string;
}
