import {Telegraf} from "telegraf";
// const {createInline} = require('app/sizes/inlineQuery.mjs')
import {createInline} from "./sizes/inlineQuery.mjs"
import {connect, createDay, createNewName, createQuery} from "./database/database.mjs";
import {createNewDay, initDays} from "./sizes/days/createNewDay.mjs";
import cron from "node-cron";
import {getRandomSize} from "./sizes/generator/mainSizeGenerator.mjs";
import {getRandomName} from "./sizes/generator/namesGenerator.mjs";
import {addAttempt} from "./sizes/inlineResult.mjs";
import {config} from "./config.mjs";
import console from "console";
import {getTopThree} from "./sizes/results.mjs";
import {sizesCleanup} from "./sizes/clearUpSizes.mjs";

await connect()



// const attemptData = {
//     userid: 12351551521,
//     userName: 'test', cockName: 'testbot', size: 123214, time: new Date()}

export const bot = new Telegraf(config.botToken)
await initDays()
bot.start((ctx) => ctx.reply('Welcome'))
// bot.help((ctx) => {
//     ctx.reply('Send me a sticker')
//     console.log(`chat id: ${ctx.chat.id}`)
// })
// bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
    // const attemptData = {
    //     userid: ctx.from.id,
    //     userName: ctx.from.username,
    //     cockName: await getRandomName(),
    //     size: await getRandomSize(),
    //     time: Date.now()
    // }
    // console.log(attemptData)
    // await createQuery({
    //     userId: ctx.from.id,
    //     size: await getRandomSize(),
    //     cockName: await getRandomName(),
    //     time: Date.now()
    // })
});

// await createNewName({
//     title: await getRandomSize(),
//     addedAt: Date.now(),
//     addedBy: 1
// })

bot.on('chosen_inline_result', async ctx => {
    await addAttempt(ctx)
})

// bot.on('chosen_inline_result', async ctx => {
//
// })
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('addcockname', async (ctx) => {
    let text = ctx.message.text.split(' ')
    text.shift()
    console.log(ctx.chat.id)
    let name = text.join(' ')
    if (name.length < 1) {
        await ctx.reply('Не правильно, попробуй ещё раз...', {reply_to_message_id : ctx.message.message_id});
        try {
            await createNewName({
                title: name,
                addedAt: Date.now(),
                addedBy: ctx.from.id
            })
        } catch (e) {
            console.log(e)
            await ctx.reply('Произошла какая-то хуйня и я не смог то, что должен был смочь. НЕ СМОГ Я ЧЕГО ПРИСТАЛИ БЛЯТЬ', {reply_to_message_id : ctx.message.message_id});
        }
        return
    }

    // Using context shortcut
    await ctx.reply('Запомнил эту хуйню', {reply_to_message_id : ctx.message.message_id});
});


cron.schedule('0 0 0 * * *', async function() {
// prod 0 0 0 * * *
//     await createNewDay()
//     console.log('new day')
//     await createNewName({
//         title: await getRandomSize(),
//         addedAt: Date.now(),
//         addedBy: 1
//     })
//     console.log('new name')
    await getTopThree().then(async () => {
        await sizesCleanup()
        await createNewDay()
    })
})

bot.catch((err) => {
    console.log(`Ooops, encountered an error for `, err)
})

bot.launch()
