export async function authCommand(ctx) {
    if (ctx.message.chat.type !== "private") {
        await ctx.reply('Эта команда работает только в личных сообщениях с ботом.', {reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML'})
    } else {
        await ctx.reply(`<pre>${btoa(ctx.from.id)}</pre>`, {reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML'})
    }
    
}