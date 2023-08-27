import {getAttemptsCountByUser, getUserById} from "../database/database.mjs";

export async function getCockStatsString(userid) {
  const user = await getUserById(userid)
  const count = await getAttemptsCountByUser(userid)

  return `Stats for ${user.userName}: \n` +
    `Current size: ${user.cockStats.currentSize}\n` +
    `Highest ever: ${user.cockStats.highestSize}\n` +
    `Lowest ever: ${user.cockStats.lowestSize}\n\n` +
    `Attempts overall: ${count}`
}