import {getActiveUsers} from "../database/database.mjs";

export async function topUsers(ctx) {
    
    const users = await getActiveUsers()
    let msg = `<b>Current top:</b> \n`
    
    
    if (users.length < 1) {
        msg = `\nСегодня никто не замерял ещё.`
    }
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        msg = msg + `${i+1}. ${user.userName} - ${user.cockStats.currentSize}см\n`
    }
    
    await ctx.reply(msg,
      {parse_mode: 'HTML'});
    
}