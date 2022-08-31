export interface IProfileBody {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  date_of_birth?: string;
}

export type EditBoxType =
  | "first_name"
  | "last_name"
  | "phone"
  | "address"
  | "date_of_birth";

export interface IChangePwdForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
