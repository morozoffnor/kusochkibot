import {createAttempt, getCurrentDay, getLastAttempt, getLastQuery} from "../database/database.mjs";
import {processUserSize} from "./profileSizeUpdater.mjs";


export const addAttempt = async function(ctx) {
  if (ctx.chosenInlineResult.result_id === '0') {
    const lastQuery = await getLastQuery(ctx.from.id)
    console.log('last' + lastQuery)
    await createAttempt({
        userid: ctx.from.id,
        userName: ctx.from.username,
        cockName: lastQuery.cockName,
        size: lastQuery.size,
        time: Date.now()
    })
    // get day and add an attempt to it
    const currentDay = await getCurrentDay()
    currentDay.attempts.push(await getLastAttempt(ctx.from.id))
    currentDay.save()


    // update user

    await processUserSize(ctx.from.id, lastQuery.size)
  }
}