import { query } from "../_generated/server";
import {v} from 'convex/values'

export const getRoom = query({
  args: { roomName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rooms")
      .filter(q => q.eq(q.field("name"), args.roomName))
      .first();
  },
});
