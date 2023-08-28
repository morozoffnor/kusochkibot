import {getRandomName} from "./generator/namesGenerator.mjs";
import {getRandomSize} from "./generator/mainSizeGenerator.mjs";
import {createQuery, getLastAttempt, getLastQuery, getUserById} from "../database/database.mjs";
import {createNewUser} from "../tools/createNewUser.mjs";
import {config} from "../config.mjs";
import {getCockStatsString} from "../stats/sizeStats.mjs";


export async function createInline(ctx)  {
    if (await getUserById(ctx.from.id) === null) {
        console.log('user not found')
        createNewUser(ctx).then(async () => {
            await answerInline(ctx)
        })
    } else {
        console.log('user found')
        await answerInline(ctx)
    }


}

async function answerInline(ctx) {
    const lastAttempt = await getLastAttempt(ctx.from.id)
    await createQuery({
        userId: ctx.from.id,
        size: await getRandomSize(),
        cockName: await getRandomName(),
        time: Date.now()
    }).then(async () => {
        const result = await getLastQuery(ctx.from.id)
        const message = await result.cockName + " у меня " + await result.size + "см"
        const statsString = await getCockStatsString(ctx.from.id)
        let newArr = [];
        // console.log('last - ' + (new Date(2023,8,20,12,0,0) - new Date(2023,8,20,11,0,0)))
        // check if attempt is allowed (3600000 = 1 hour)
        console.log('creating inline')
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
                newArr[0] = {
                    type: 'article',
                    id: 0,
                    title: 'У кого меньше',
                    description: 'у того больше',
                    input_message_content: {message_text: message}
                };
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
