export type UserRole = "attendee" | "organizer" | "admin";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
