import {getUserStatsString} from "../stats/userStats.mjs";

export async function myStats(ctx) {
  const message = await getUserStatsString(ctx.from.id)
  await ctx.reply(message)
}