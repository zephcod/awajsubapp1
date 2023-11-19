import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subscriberSchema = z.object({
  id: z.number(),
  email: z.string(),
  _id: z.string().nullable(),
})

export type Task = z.infer<typeof subscriberSchema>