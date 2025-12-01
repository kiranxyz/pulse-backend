export type UserRole = "attendee" | "organizer" | "admin" | "ticketchecker";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
