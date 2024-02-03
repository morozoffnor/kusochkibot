import {getActiveUsers} from "../database/database.mjs";

export async function topUsers(ctx) {
    
    const users = await getActiveUsers()
    let msg = `<b>Current top:</b> \n`
    
    // is it sorted?
    // maybe wrap it in await-then?
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        msg = msg + `${i+1}. ${user.cockStats.currentSize}см\n`
    }
    
    await ctx.reply(msg,
      {parse_mode: 'HTML'});
    
}