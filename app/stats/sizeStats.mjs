import {getAttemptsCountByUser, getUserById} from "../database/database.mjs";

export async function getCockStatsString(userid) {
  const user = await getUserById(userid)
  const count = await getAttemptsCountByUser(userid)

  return `<b>Stats for @${user.userName}: </b>\n\n` +
    `Current size: <u>${user.cockStats.currentSize}см</u>\n` +
    `Highest ever: ${user.cockStats.highestSize}см\n` +
    `Lowest ever: ${user.cockStats.lowestSize}см\n\n` +
    `<i>Attempts overall: ${count}\n` +
    `Wins overall: ${user.cockStats.wins}</i>`
}