import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  address: z.string().optional(),
  date: z.string().min(1, "Date is required"), // send as ISO string
  time: z.string().optional(),
  totalSeats: z.number().min(1, "Total seats must be greater than 0"),
  seatsBooked: z.number().optional().default(0),
  discount: z
    .object({
      firstN: z.number().optional().default(0),
      percent: z.number().optional().default(0),
    })
    .optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  name: z.string().min(1, "Event name is required"),
  organizer: z.string().min(1, "Organizer ID is required"), // should be Mongo ObjectId string
  capacity: z.number().min(1, "Capacity is required"),
  attendees: z.array(z.string()).optional(), // array of user IDs
  location: z.string().min(1, "Location is required"),
  ticketsSold: z.number().optional().default(0),
  ticketSold: z.number().optional(),
  ticketAvailable: z.number().optional(),
  options: z
    .object({
      discountFirst10: z.boolean().optional().default(false),
      showHurryUp: z.boolean().optional().default(false),
      reminder: z.boolean().optional().default(false),
      emailNotify: z.boolean().optional().default(false),
    })
    .optional(),
  timestamps: z.boolean().optional().default(true),
});
