import {getTopThreeUsers} from "../database/database.mjs";
import {config} from "../config.mjs";
import {bot} from "../main.mjs";
import {getResultString} from "../tools/chatgpt.mjs";

const chatGPTEnabled = config.openAIIntegration

/**
 * Post result with 3 winners
 * @param {Array} users
 */
async function postResultsWith3(users) {
  console.log('winner: ' + users[0].userName)
  let winner = users[0]
  winner.cockStats.wins = winner.cockStats.wins + 1
  await winner.save()

  getResultString(users[0].userName, users[0].cockStats.currentSize, chatGPTEnabled).then(async (story) => {
    const message =
      `Настало время огласить победителей!\n` +
      `1. @${users[0].userName} - ${users[0].cockStats.currentSize}🏆\n` +
      `2. @${users[1].userName} - ${users[1].cockStats.currentSize}\n` +
      `3. @${users[2].userName} - ${users[2].cockStats.currentSize}\n\n` +
      `${story.text}`
    await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
  })
}

/**
 * Post result with 2 winners
 * @param {Array} users
 */
async function postResultsWith2(users) {
  console.log('winner: ' + users[0].userName)
  let winner = users[0]
  winner.cockStats.wins = winner.cockStats.wins + 1
  await winner.save()

  getResultString(users[0].userName, users[0].cockStats.currentSize, chatGPTEnabled).then(async (story) => {
    const message =
      `Настало время огласить победителей!\n` +
      `1. @${users[0].userName} - ${users[0].cockStats.currentSize}🏆\n` +
      `2. @${users[1].userName} - ${users[1].cockStats.currentSize}\n\n` +
      `${story.text}`
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
      `${story.text}`
    await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
  })
}


/**
 * Gets top 3 users and posts results in the chat
 */
export async function getTopThree() {
  const users = await getTopThreeUsers()
  console.log('users length ' + users.length)

  switch (users.length){
    case 1: {
        await postResultsWith1(users)
        console.log('found one')
        break
    }
    case 2: {
        await postResultsWith2(users)
        console.log('found two')
        break
    }
    case 3: {
        await postResultsWith3(users)
        console.log('found three')
        break
    }
    case 0: {
        console.log('found zero')
        break
    }

  }
}