import { getDb } from "./connection";
import { contacts } from "@db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
}) {
  const [result] = await getDb()
    .insert(contacts)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      address: data.address ?? null,
      message: data.message ?? null,
      status: "new",
    })
    .$returningId();
  return result;
}

export async function findAllContacts() {
  return getDb().query.contacts.findMany({
    orderBy: [desc(contacts.createdAt)],
  });
}

export async function updateContactStatus(
  id: number,
  status: "new" | "contacted" | "qualified" | "closed"
) {
  await getDb()
    .update(contacts)
    .set({ status })
    .where(eq(contacts.id, id));
}

export async function deleteContact(id: number) {
  await getDb().delete(contacts).where(eq(contacts.id, id));
}

export async function getContactStats() {
  const db = getDb();
  const result = await db
    .select({
      status: contacts.status,
      count: sql<number>`count(*)`,
    })
    .from(contacts)
    .groupBy(contacts.status);

  const stats = {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
  };

  for (const row of result) {
    stats.total += row.count;
    if (row.status === "new") stats.new = row.count;
    if (row.status === "contacted") stats.contacted = row.count;
    if (row.status === "qualified") stats.qualified = row.count;
    if (row.status === "closed") stats.closed = row.count;
  }

  return stats;
}
