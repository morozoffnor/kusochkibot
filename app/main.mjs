import {Telegraf} from "telegraf";
import {createInline} from "./sizes/inlineQuery.mjs"
import {connect} from "./database/database.mjs";
import {createNewDay, initDays} from "./sizes/days/createNewDay.mjs";
import cron from "node-cron";
import {addAttempt} from "./sizes/inlineResult.mjs";
import {config} from "./config.mjs";
import console from "console";
import {getTopThree} from "./sizes/results.mjs";
import {sizesCleanup} from "./sizes/clearUpSizes.mjs";
import {initNames} from "./sizes/generator/namesGenerator.mjs";
import {addName} from "./commands/addName.mjs";

// connect to DB
await connect()


export const bot = new Telegraf(config.botToken)
await initDays()
await initNames()
bot.start((ctx) => ctx.reply('Welcome'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
});

bot.on('message', async (ctx, next) => {
    console.log(ctx.message.text)
    next()
})


bot.on('chosen_inline_result', async ctx => {
    await addAttempt(ctx)
})

bot.hears('Понты', (ctx) => ctx.reply('Точно понты'))

bot.command('addname', async (ctx) => {
    await addName(ctx)
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
