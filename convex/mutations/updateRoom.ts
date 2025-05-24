// convex/updateRoom.ts
import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updateRoom = mutation({
  args: {
    roomName: v.string(),
    board: v.array(v.string()),
    turn: v.string(),
    winner: v.optional(v.string()),
  },
  handler: async (ctx, { roomName, board, turn, winner }) => {
    const room = await ctx.db
      .query('rooms')
      .withIndex('by_roomName', q => q.eq('name', roomName))
      .unique();

    if (!room) throw new Error('Room not found');

    await ctx.db.patch(room._id, {
      board,
      turn,
      winner,
    });
  },
});
