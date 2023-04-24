import { Telegraf } from 'telegraf';
import {CockSize} from "./functions/cockSize";
import {CockNames} from './functions/cockNames'
import * as console from "console";
import {constructCockMessage} from "./functions/constructCockMessage";
import {
  getLastCockSizeUsageByUsername,
  getLastQueryByUser,
  getWinner,
  insertNewCock, changeSizesOnWin,
  updateCockSize, getCockSizeByUsername, addAttempt, getAttempts
} from "./database/dbnew";

import {config} from "./config";
const cron = require('node-cron');


const bot = new Telegraf(config.botToken!);
const cockNames = new CockNames()

// dbh.createdb()


bot.command('addcockname', async (ctx) => {
  let text = ctx.message.text.split(' ')
  text.shift()
  console.log(ctx.chat.id)
  let name = text.join(' ')
  if (name.length < 1) {
    await ctx.reply('Invalid cock name, ' + await cockNames.getRandomCockName(), {reply_to_message_id : ctx.message.message_id});
    return
  }
  await cockNames.addCockName(name)

  // Using context shortcut
  await ctx.reply('done', {reply_to_message_id : ctx.message.message_id});
});
bot.command('setcooldown', async (ctx) => {
  let text = ctx.message.text.split(' ')
  text.shift()
  try {
    const cooldown = Number.parseFloat(text.join(''))
    config.cockSizeUsageCooldown = cooldown
    await ctx.reply('Кулдаун был изменён на ' + config.cockSizeUsageCooldown, {reply_to_message_id : ctx.message.message_id})
  } catch (e) {
    await ctx.reply('Ошибка при изменении кулдауна', {reply_to_message_id : ctx.message.message_id})
    console.log(e)
  }
});

// bot.on(message('text'), async (ctx) => {
//   // Explicit usage
//   await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);
//
//   // Using context shortcut
//   await ctx.reply(`Hello ${ctx.state.role}`);
// });
//
// bot.on('callback_query', async (ctx) => {
//   // Explicit usage
//   await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);
//
//   // Using context shortcut
//   await ctx.answerCbQuery();
// });

bot.on('inline_query', async ctx => {
  const cz = new CockSize()
  let size = await constructCockMessage(ctx.from.username!)
  // console.log(size)
  let newArr = [];
  if (await cz.checkIfCockSizeAllowed(ctx.from.username!)) {
    newArr[0] = {
      type: 'article',
      id: 0,
      title: 'У кого меньше',
      description: 'у того больше',
      input_message_content: {message_text: size}
    };
  } else {
    newArr[0] = {
      type: 'article',
      id: 1,
      title: 'Твой хуй на кулдауне',
      description: 'бедняга',
      input_message_content: {message_text: "Мой хуй на кулдауне, а я его всё ещё дрюкаю"}
    };
  }
  // @ts-ignore
  return ctx.answerInlineQuery(newArr, {cache_time: 0});
});
bot.on('chosen_inline_result', async ctx => {
  const username = ctx.from.username!
  if (ctx.chosenInlineResult.result_id == '0') {
    console.log('You chosed an inline query result ' + username);
    const lastQuery = await getLastQueryByUser(username)

    if (lastQuery != 0) {
      if (await getLastCockSizeUsageByUsername(username)) {
          if (await getCockSizeByUsername(username) > lastQuery) {
            await updateCockSize(username, lastQuery)
          } else {
            if (await getAttempts(username) == 0) {
              await updateCockSize(username, lastQuery)
              return
            }
            await addAttempt(username)
            return
          }
      }
      else {
        await insertNewCock(username,lastQuery)
      }
    }

  } else {
    console.log('You chosed an inline query result 1');
  }
});


cron.schedule('0 0 * * * *', function() {
  console.log('running a task every minute');
  const i = async function() {
    const winner = await getWinner()
    const cock = await cockNames.getRandomCockName()
    if (winner.attempts == 0) {
      return
    }
    try {
      await bot.telegram.sendMessage(config.chatId, 'Победитель этого часа - @'+winner.username+'! \nКол-во попыток: '+winner.attempts.toString()+'\nТеперь можно с уверенностью сказать мужикам: "'+cock+' у меня '+winner.minSize+'"')
          .then(async () => {
            await changeSizesOnWin()
          })
    } catch (e) {
      console.log(e)
    }

  }
  i()
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
