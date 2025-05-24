import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const joinRoom = mutation({
  args: { roomName: v.string(), username: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter(q => q.eq(q.field("name"), args.roomName))
      .first();

    if (!room) throw new Error("Room not found");
    if (room.players.length >= 2) throw new Error("Room full");

    await ctx.db.patch(room._id, {
      players: [...room.players, { username: args.username }],
    });

    return room._id;
  },
});
