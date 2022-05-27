import { UserType } from '@prisma/client';

export interface IUserResponse {
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
  createdAt?: string;
  updatedAt?: string;
}
