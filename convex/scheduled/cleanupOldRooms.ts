import { internalMutation } from "../_generated/server";

export const cleanupOldRooms = internalMutation(async ({ db }) => {
  const oneHourAgo = Date.now() - 1000 * 60 * 60;

  const oldRooms = await db.query("rooms")
    .filter((q) => q.lt(q.field("createdAt"), oneHourAgo))
    .collect();

  for (const room of oldRooms) {
    await db.delete(room._id);
  }
});