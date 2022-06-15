export interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: Date;
  role: string;
  image_id?: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}
