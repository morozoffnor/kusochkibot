import {getTopThreeUsers} from "../database/database.mjs";
import {config} from "../config.mjs";
import {bot} from "../main.mjs";
import {getResultString} from "../tools/chatgpt.mjs";
import {logger} from "../tools/logger.mjs";

const chatGPTEnabled = config.openAIIntegration

/**
 * Post result with 3 winners
 * @param {Array} users
 */
async function postResultsWith3(users) {
    logger.info('winner: ' + users[0].userName)
    let winner = users[0]
    winner.cockStats.wins = winner.cockStats.wins + 1
    await winner.save()
    
    getResultString(users[0].userName, users[0].cockStats.currentSize, chatGPTEnabled).then(async (story) => {
        const message =
          `Настало время огласить победителей!\n` +
          `1. @${users[0].userName} - ${users[0].cockStats.currentSize}🏆\n` +
          `2. @${users[1].userName} - ${users[1].cockStats.currentSize}\n` +
          `3. @${users[2].userName} - ${users[2].cockStats.currentSize}\n\n` +
          `${story}`
        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
    })
}

/**
 * Post result with 2 winners
 * @param {Array} users
 */
async function postResultsWith2(users) {
    logger.info('winner: ' + users[0].userName)
    let winner = users[0]
    winner.cockStats.wins = winner.cockStats.wins + 1
    await winner.save()
    
    getResultString(users[0].userName, users[0].cockStats.currentSize, chatGPTEnabled).then(async (story) => {
        const message =
          `Настало время огласить победителей!\n` +
          `1. @${users[0].userName} - ${users[0].cockStats.currentSize}🏆\n` +
          `2. @${users[1].userName} - ${users[1].cockStats.currentSize}\n\n` +
          `${story}`
        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
    })
}

/**
 * Post result with only 1 winner
 * @param {Array} users
 */
async function postResultsWith1(users) {
    console.log('winner: ' + users[0].userName)
    let winner = users[0]
    winner.cockStats.wins = winner.cockStats.wins + 1
    await winner.save()
    
    getResultString(users[0].userName, users[0].cockStats.currentSize, chatGPTEnabled).then(async (story) => {
        const message =
          `Настало время огласить победителей!\n` +
          `1. @${users[0].userName} - ${users[0].cockStats.currentSize}🏆\n\n` +
          `${story}`
        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
    })
}


/**
 * Gets top 3 users and posts results in the chat
 */
export async function getTopThree() {
    const users = await getTopThreeUsers()
    logger.info('There are ' + users.length + ' participants today')
    
    switch (users.length) {
        case 1: {
            await postResultsWith1(users)
            logger.info('Found one winner today')
            break
        }
        case 2: {
            await postResultsWith2(users)
            logger.info('Found two winners today')
            break
        }
        case 3: {
            await postResultsWith3(users)
            logger.info('Found three winners today')
            break
        }
        case 0: {
            logger.info('Found no winners today')
            break
        }
        
    }
}