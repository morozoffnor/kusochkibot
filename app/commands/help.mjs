

export async function help(ctx) {

  const helpString = `Я тоже тупой, но подскажу: \n\n` +
    `Добавить имя: \n` +
    `<code>/addname [name]</code>`

  await ctx.reply(helpString,
    {reply_to_message_id : ctx.message.message_id, parse_mode: 'HTML'});

}