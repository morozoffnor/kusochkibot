import {IncUserStats} from '../database/database.mjs'
export async function collectStats(userid,type) {
  const inc = new IncUserStats()
  switch (type) {
    case "text": {
      await inc.message(userid)
      break
    }
    case "sticker": {
      await inc.sticker(userid)
      break
    }
    case "voice": {
      await inc.voice(userid)
      break
    }
    case "image": {
      await inc.image(userid)
      break
    }
    case "video": {
      await inc.video(userid)
      break
    }
    case "video_note": {
      await inc.circle(userid)
      break
    }
    case "poll": {
      await inc.poll(userid)
      break
    }
    case "via_bot": {
      await inc.bot(userid)
      break
    }
    default: {
      break
    }
  }
}