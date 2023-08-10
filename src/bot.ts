import {Telegraf} from 'telegraf';
import {CockSize} from "./functions/cockSize";
import {CockNames} from './functions/cockNames'
import * as console from "console";
import {
  addAttempt, addCockName,
  addWin,
  changeSizesOnWin,
  deleteQueries,
  getAttempts,
  getCockSizeByUsername,
  getLastCockSizeUsageByUsername,
  getLastQueryByUser,
  getWinner,
  insertNewCock,
  updateCockSize
} from "./database/dbnew";

import {config} from "./config";
import {importNames} from "./functions/insertFileToDB";
import {winnerAnnouncement} from "./resources/messages/winnerAnnouncement";

const cron = require('node-cron');
const bot = new Telegraf(config.botToken!);
const cockNames = new CockNames()

const mongoose = require('mongoose');

async function connectMongo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

connectMongo()


bot.command('addcockname', async (ctx) => {
  let text = ctx.message.text.split(' ')
  text.shift()
  console.log(ctx.chat.id)
  let name = text.join(' ')
  if (name.length < 1) {
    await ctx.reply('Invalid cock name, ' + await cockNames.getRandomCockName(), {reply_to_message_id : ctx.message.message_id});
    try {
      await addCockName(name, ctx.from.username!)
    } catch (e) {
      console.log(e)
    }
    return
  }
  await cockNames.addCockName(name)

  // Using context shortcut
  await ctx.reply('Запомнил эту хуйню', {reply_to_message_id : ctx.message.message_id});
});
bot.command('setcooldown', async (ctx) => {
  let text = ctx.message.text.split(' ')
  text.shift()
  try {
    config.cockSizeUsageCooldown = Number.parseFloat(text.join(''))
    await ctx.reply('Кулдаун был изменён на ' + config.cockSizeUsageCooldown, {reply_to_message_id : ctx.message.message_id})
  } catch (e) {
    await ctx.reply('Ошибка при изменении кулдауна', {reply_to_message_id : ctx.message.message_id})
    console.log(e)
  }
});

bot.command('insert', async (ctx) => {
  await importNames(process.cwd() + "/resources/cocknames.txt")
})

bot.on('inline_query', async ctx => {
  const cz = new CockSize()
  let size = await cz.constructCockMessage(ctx.from.username!)
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

bot.on('message', async ctx =>{
  if (Math.random() < 0.01) {
    if (Math.random() < 0.5) {
      await ctx.reply('Понты', {reply_to_message_id : ctx.message.message_id})
    } else {
      await ctx.reply('Теперь я знаю чуть больше', {reply_to_message_id : ctx.message.message_id})
    }
  }
})


cron.schedule('0 0 0 * * *', function() {
  console.log('running a task every minute');
  const i = async function() {
    const winner = await getWinner()
    if (winner.attempts == 0) {
      return
    }
    let message = await winnerAnnouncement()
    try {
      await bot.telegram.sendMessage(config.chatId, message, { parse_mode: "HTML" })
          .then(async () => {
            await changeSizesOnWin()
            await addWin(winner.username)
            await deleteQueries()
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
