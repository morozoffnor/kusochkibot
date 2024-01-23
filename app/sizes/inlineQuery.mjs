import {getRandomName} from "./generator/namesGenerator.mjs";
import {getRandomSize} from "./generator/mainSizeGenerator.mjs";
import {createQuery, getLastAttempt, getLastQuery, getUserById} from "../database/database.mjs";
import {createNewUser} from "../tools/createNewUser.mjs";
import {config} from "../config.mjs";
import {getCockStatsString} from "../stats/sizeStats.mjs";
import {handleItem} from "../tools/items/tools/itemsHandler.mjs";

/**
 * Creates inline for the user. Creates a new user if necessary
 * @param ctx - Telegram inline context
 * @returns {Promise<void>}
 */
export async function createInline(ctx) {
    if (await getUserById(ctx.from.id) === null) {
        createNewUser(ctx).then(async () => {
            await answerInline(ctx)
        })
    } else {
        let user = await getUserById(ctx.from.id)
        if (ctx.from.username != user.userName) {
            user.userName = ctx.from.username
            await user.save()
        }
        await answerInline(ctx)
    }
    
    
}

/**
 * Answers inline request according to the user's state
 * @param ctx - Telegram inline context
 * @returns {Promise<void>}
 */
async function answerInline(ctx) {
    const lastAttempt = await getLastAttempt(ctx.from.id)
    const user = await getUserById(ctx.from.id)
    await createQuery(await createQueryData(ctx)).then(async () => {
        const result = await getLastQuery(ctx.from.id)
        let message = await result.cockName + " у меня " + await result.size + "см"
        if (result.item != null) {
            console.log('found item in last query')
            message = message + '\nUsing `' + result.item.name + ' [' + result.item.rarity + ']`'
        }
        const statsString = await getCockStatsString(ctx.from.id)
        let newArr = [];
        // check if attempt is allowed (3600000 = 1 hour)
        if (lastAttempt == null) {
            newArr[0] = {
                type: 'article',
                id: 0,
                title: 'У кого меньше',
                description: 'у того больше',
                input_message_content: {message_text: message}
            };
        } else {
            if ((Date.now() - lastAttempt.time) > config.cockSizeUsageCooldown) {
                if (user.activatedItem != null) {
                    newArr[0] = {
                        type: 'article',
                        id: 0,
                        title: 'Достать линейку',
                        description: `item: ${user.activatedItem.name} [${user.activatedItem.rarity}]`,
                        input_message_content: {message_text: message}
                    };
                } else {
                    newArr[0] = {
                        type: 'article',
                        id: 0,
                        title: 'Достать линейку',
                        description: 'Lower number better person',
                        input_message_content: {message_text: message, parse_mode: 'Markdown'}
                    };
                }
            } else {
                newArr[0] = {
                    type: 'article',
                    id: 1,
                    title: 'Твой хуй на кулдауне',
                    description: 'бедняга',
                    input_message_content: {message_text: "Мой хуй на кулдауне, а я его всё ещё дрюкаю"}
                };
                newArr[1] = {
                    type: 'article',
                    id: 2,
                    title: 'Stats',
                    description: 'штуки',
                    input_message_content: {message_text: statsString, parse_mode: 'HTML'}
                }
            }
        }
        
        return ctx.answerInlineQuery(newArr, {cache_time: 0});
    })
}

async function createQueryData(ctx){
    let userid = ctx.from.id
    let user = await getUserById(userid)
    if (user.activatedItem != null) {
        console.log('found activated item in user')
        console.log(user.activatedItem)
        const affectedSize = await handleItem(user.activatedItem, await getRandomSize(), user)
        return {
            userId: ctx.from.id,
            size: affectedSize,
            cockName: await getRandomName(),
            time: Date.now(),
            item: user.activatedItem
        }
    } else {
        return {
            userId: ctx.from.id,
            size: await getRandomSize(),
            cockName: await getRandomName(),
            time: Date.now()
        }
    }
}
