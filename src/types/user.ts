import { Role } from "./enums";

export interface UserResponse {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthday?: string | null;
  role: Role[];
  isActive: boolean;
  createdAt: string;
  image?: string;
}
