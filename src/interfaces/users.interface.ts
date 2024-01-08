export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  password: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
