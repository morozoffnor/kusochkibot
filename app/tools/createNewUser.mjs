import {newUser} from "../database/database.mjs";


export async function createNewUser(ctx) {
    const user = {
        userid: ctx.from.id,
        userName: ctx.from.username || 'undefined',
        money: 100,
        cockStats: {
            wins: 0
        }
    }
    await newUser(user)
}