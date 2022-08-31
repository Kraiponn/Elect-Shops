import { IErorrResponseData } from "@/features/interfaces";

export enum UserType {
  GUEST = "GUEST",
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IAuthPayload {
  sub: number;
  email: string;
  user_name: string;
  image_url: string;
  role: "GUEST" | "USER" | "ADMIN";
}

export interface IProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  date_of_birth?: string;
  phone?: string;
  address?: string;
  role: "GUEST" | "USER" | "ADMIN";
  image_id?: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IInputEditProfile {
  form: HTMLFormElement | undefined | FormData;
  userId: number;
}

export interface IInputEditPassword {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export interface IAuth {
  user?: IAuthPayload | null;
  profile?: IProfile | null;
  access_token?: string;
  error?: IErorrResponseData | null;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface IAuthForm {
  email?: string;
  password?: string;
}

export interface IResetPWDForm {
  password: string;
}

export interface IAuthInput {
  authType: "SIGNUP" | "LOGIN";
  email?: string;
  password?: string;
}

export interface IAuthState {
  isLoading: boolean;
  isSuccess: boolean;
  data?: IAuthPayload | null;
}

export interface IResponseMessage {
  message: string;
}
