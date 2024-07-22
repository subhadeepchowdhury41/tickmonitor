import { User } from "./user.type";

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: string | User;
}