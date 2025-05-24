import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    players: v.array(v.object({ username: v.string() })),
    board: v.array(v.string()),
    turn: v.string(),
    winner: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_roomName", ["name"])
});