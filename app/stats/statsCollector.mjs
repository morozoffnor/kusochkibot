import {IncUserStats} from '../database/database.mjs'
export async function collectStats(userid,type) {
  const inc = new IncUserStats()
  switch (type) {
    case "text": {
      // console.log(type)
      await inc.message(userid)
      break
    }
    case "sticker": {
      // console.log(type)
      await inc.sticker(userid)
      break
    }
    case "voice": {
      // console.log(type)
      await inc.voice(userid)
      break
    }
    case "image": {
      // console.log(type)
      await inc.image(userid)
      break
    }
    case "video": {
      // console.log(type)
      await inc.video(userid)
      break
    }
    case "video_note": {
      // console.log(type)
      await inc.circle(userid)
      break
    }
    case "poll": {
      // console.log(type)
      await inc.poll(userid)
      break
    }
    case "via_bot": {
      // console.log(type)
      await inc.bot(userid)
      break
    }
    default: {
      break
    }
  }
}