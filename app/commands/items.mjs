

export async function items(ctx) {
    const helpString = `<a href="http://t.me/Kusochkibot/stats">.</a>`
    
    await ctx.reply(helpString,
      {parse_mode: 'HTML'});
}