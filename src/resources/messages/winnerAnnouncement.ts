import {getTopThree} from "../../database/dbnew";

export async function winnerAnnouncement():Promise<string> {
    const users = await getTopThree()
    let winner = users[0]!
    let second = users[1]
    let third = users[2]

    if (second == undefined) {
        second = {
            username: "второй лох не нашелся",
            minSize: 0,
            attempts: 0,
            wins: 0
        }
    }
    if (third == undefined) {
        third = {
            username: "третий лох не нашелся",
            minSize: 0,
            attempts: 0,
            wins: 0
        }
    }

    const message:string = "*Настало время огласить победителей!*\n" +
        `1. @${winner.username}: ${winner.minSize} 🏆\n` +
        `2. @${second.username}: ${second.minSize}\n` +
        `3. @${third.username}: ${third.minSize}\n` +
        '\n' +
        `${winner.username} попытал удачу ${winner.attempts} раз(а) и смог прийти к успеху!\n ` +
        `До этого он побеждал ${winner.wins} раз(а).`

    return message
}