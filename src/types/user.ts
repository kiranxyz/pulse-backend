export type UserRole =
  | "participant"
  | "organizer"
  | "admin"
  | "ticketchecker"
  | "guest";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
export const normalizeRole = (role?: string): UserRole => {
  const r = role?.toLowerCase() || "guest";
  switch (r) {
    case "admin":
    case "organizer":
    case "ticketchecker":
    case "participant":
      return r;
    default:
      return "guest";
  }
};
