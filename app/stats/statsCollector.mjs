import {IncUserStats} from '../database/database.mjs'
import {EventsCoordinator} from "../events/EventsCoordinator.mjs";
import {eventGoing} from "../main.mjs";

/**
 * Collects stats and increments corresponding stat. Also checks for event.
 * @param {Number} userid - User's telegram ID
 * @param {String} type - User's size returned from an attempt
 */
export async function collectStats(userid, type) {
    const inc = new IncUserStats()
    const c = new EventsCoordinator()
    if (eventGoing) {
        await c.handleExpEvent(userid, type)
    }
    
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
        case "item": {
            await inc.items(userid)
            break
        }
        default: {
            break
        }
    }
}