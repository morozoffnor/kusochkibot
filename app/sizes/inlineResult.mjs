import {createAttempt, getCurrentDay, getLastAttempt, getLastQuery, getUserById} from "../database/database.mjs";
import {processUserSize} from "./profileSizeUpdater.mjs";

/**
 * Saves an attempt and processes user's size
 * @param ctx - Telegram inlineResult context
 * @returns {Promise<void>}
 */
export const addAttempt = async function (ctx) {
    if (ctx.chosenInlineResult.result_id === '0') {
        const lastQuery = await getLastQuery(ctx.from.id)
        await createAttempt({
            userid: ctx.from.id,
            userName: ctx.from.username,
            cockName: lastQuery.cockName,
            size: lastQuery.size,
            item: lastQuery.item,
            time: Date.now()
        })
        // get day and add an attempt to it
        const currentDay = await getCurrentDay()
        currentDay.attempts.push(await getLastAttempt(ctx.from.id))
        currentDay.save()
        let user = await getUserById(ctx.from.id)
        user.activatedItem = null
        await user.save()
        
        
        // update user
        await processUserSize(ctx.from.id, lastQuery.size)
    }
}