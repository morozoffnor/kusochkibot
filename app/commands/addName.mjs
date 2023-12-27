import console from "console";
import {createNewName} from "../database/database.mjs";
import {checkIfNameExists} from "../tools/namesChecker.mjs";
import {logger} from "../tools/logger.mjs";

const invalidSyntaxErrorMessage = `Нихуя\n\n` +
  `Чекай как надо:\n` +
  `<code>/addname [name]</code>`

const nameAlreadyPresentErrorMessage = `Такую хуйню я уже знаю`


const allDoneMessage = `Запомнил эту хуйню`


export async function addName(ctx) {
  let text = ctx.message.text.split(' ')
  text.shift()
  let name = text.join(' ')
  if (name.length < 1) {
    await ctx.reply(
      invalidSyntaxErrorMessage,
      {reply_to_message_id : ctx.message.message_id, parse_mode: 'HTML'});
    return
  } else {
    const nameExists = await checkIfNameExists(name)
    if (nameExists) {
      await ctx.reply(nameAlreadyPresentErrorMessage, {reply_to_message_id : ctx.message.message_id});
    } else {
      try {
        await createNewName({
          title: name,
          addedAt: Date.now(),
          addedBy: ctx.from.id
        })
        await ctx.reply(allDoneMessage, {reply_to_message_id : ctx.message.message_id});
      } catch (e) {
        logger.error('Error while adding a new name: ',e)
        const fatalErrorMessage = `Произошла какая-то хуйня и я не смог то, что должен был смочь. НЕ СМОГ Я ЧЕГО ПРИСТАЛИ БЛЯТЬ\n\nВот ошибка для тупого разраба: \n${e}`
        await ctx.reply(fatalErrorMessage, {reply_to_message_id : ctx.message.message_id});
      }
    }
  }
}