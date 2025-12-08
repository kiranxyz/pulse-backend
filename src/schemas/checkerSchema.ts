import { z } from "zod";

export const AddCheckerSchema = z.strictObject({
  name: z.string().min(1),
  email: z.string().email(),
  events: z.array(z.string()).optional(),
});
