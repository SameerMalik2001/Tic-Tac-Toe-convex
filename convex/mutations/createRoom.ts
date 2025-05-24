import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: { roomName: v.string(), username: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rooms")
      .filter(q => q.eq(q.field("name"), args.roomName))
      .first();

    if (existing) throw new Error("Room already exists");

    return await ctx.db.insert("rooms", {
      name: args.roomName,
      players: [{ username: args.username }],
      board: Array(9).fill(""),
      turn: "X",
      createdAt: Date.now(),
    });
  },
});
