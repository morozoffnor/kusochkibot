import {getUserById} from "../database/database.mjs";

export async function getUserStatsString(userid) {
  const user = await getUserById(userid)

  if (user.stats) {
    const messagesSent = user.stats.messagesSent === undefined ? 0 : user.stats.messagesSent
    const imagesSent = user.stats.imagesSent === undefined ? 0 : user.stats.imagesSent
    const voicesSent = user.stats.voicesSent === undefined ? 0 : user.stats.voicesSent
    const stickersSent = user.stats.stickersSent === undefined ? 0 : user.stats.stickersSent
    const videosSent = user.stats.videosSent === undefined ? 0 : user.stats.videosSent
    const circlesSent = user.stats.circlesSent === undefined ? 0 : user.stats.circlesSent
    const pollsSent = user.stats.pollsSent === undefined ? 0 : user.stats.pollsSent
    const botUses = user.stats.botUses === undefined ? 0 : user.stats.botUses

    return await formStatsString(
      user.username,
      messagesSent,
      imagesSent,
      voicesSent,
      stickersSent,
      videosSent,
      circlesSent,
      pollsSent,
      botUses)

  } else {
    const {
      messagesSent,
      imagesSent,
      voicesSent,
      stickersSent,
      videosSent,
      circlesSent,
      pollsSent,
      botUses
    } = 0

    return await formStatsString(
      user.username,
      messagesSent,
      imagesSent,
      voicesSent,
      stickersSent,
      videosSent,
      circlesSent,
      pollsSent,
      botUses)
  }

}

async function formStatsString(
  username,
  messagesSent,
  imagesSent,
  voicesSent,
  stickersSent,
  videosSent,
  circlesSent,
  pollsSent,
  botUses
) {
  return `<b>Вот что я знаю о @${username}</b>: \n` +
    `Сообщения (текст): ${messagesSent}\n` +
    `Картиночки: ${imagesSent}\n` +
    `Войсы: ${voicesSent}\n` +
    `Стикосы: ${stickersSent}\n`+
    `Видосы: ${videosSent}\n` +
    `Кружки: ${circlesSent}\n` +
    `Опросы: ${pollsSent}\n` +
    `Дрюканье бота: ${botUses}`
}