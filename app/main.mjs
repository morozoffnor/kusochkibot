import {Telegraf} from "telegraf";
import {createInline} from "./sizes/inlineQuery.mjs"
import {connect, createNewName} from "./database/database.mjs";
import {createNewDay, initDays} from "./sizes/days/createNewDay.mjs";
import cron from "node-cron";
import {addAttempt} from "./sizes/inlineResult.mjs";
import {config} from "./config.mjs";
import console from "console";
import {getTopThree} from "./sizes/results.mjs";
import {sizesCleanup} from "./sizes/clearUpSizes.mjs";
import {initNames} from "./sizes/generator/namesGenerator.mjs";

// connect to DB
await connect()


export const bot = new Telegraf(config.botToken)
await initDays()
await initNames()
bot.start((ctx) => ctx.reply('Welcome'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
});


bot.on('chosen_inline_result', async ctx => {
    await addAttempt(ctx)
})

bot.hears('Понты', (ctx) => ctx.reply('Точно понты'))

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
    await getTopThree().then(async () => {
        await sizesCleanup()
        await createNewDay()
    })
})

bot.catch((err) => {
    console.log(`Ooops, encountered an error for `, err)
})

bot.launch()
