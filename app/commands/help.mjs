export async function help(ctx) {
    
    const helpString = `Я тоже тупой, но подскажу: \n\n` +
      `Добавить имя: \n` +
      `<code>/addname [name]</code>\n\n` +
      `Топ хуёв за сегодня:\n` +
      `<code>/top</code>\n\n` +
      `Мониторинг (жив ли бот):\n` +
      `<a href="https://kuma.kitburg.ru/status/kuski">Status Page</a>\n\n` +
      `Открыть веб:\n` +
      `<a href="http://t.me/Kusochkibot/stats">Main Page</a>\n\n`
    
    await ctx.reply(helpString,
      {reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML', link_preview_options: {is_disabled: true}});
    
}