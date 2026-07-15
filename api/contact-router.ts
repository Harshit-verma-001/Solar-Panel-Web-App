import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import {
  createContact,
  findAllContacts,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from "./queries/contacts";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        address: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await createContact(input);
      return { success: true as const, id: result.id };
    }),

  list: adminQuery.query(async () => {
    return findAllContacts();
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number().positive(),
        status: z.enum(["new", "contacted", "qualified", "closed"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateContactStatus(input.id, input.status);
      return { success: true as const };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number().positive() }))
    .mutation(async ({ input }) => {
      await deleteContact(input.id);
      return { success: true as const };
    }),

  stats: adminQuery.query(async () => {
    return getContactStats();
  }),
});
