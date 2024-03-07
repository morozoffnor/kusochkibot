import {DateTime} from "luxon";
import {BotEvent} from "../database/Schemas/BotEvent.mjs";
import {getEvent, getEvents, IncUserStats} from "../database/database.mjs";
import {bot, botEvent, eventGoing, switchEvent} from "../main.mjs";
import {config} from "../config.mjs";
import {logger} from "../tools/logger.mjs";

export class EventsCoordinator {

    async checkForEvent() {
        console.log('checking event')
        const events = await getEvents()
        console.log(events.length)
        for (let i = 0; i < events.length; i++) {
            const start = DateTime.fromJSDate(events[i].startTime)
            const end = DateTime.fromJSDate(events[i].endTime)
            const now = DateTime.now()

            const endDiff = now.diff(end, 'minutes').toObject()
            if (endDiff.minutes < 1 && endDiff.minutes > 0) {
                await this.endEvent(events[i])
                console.log("Ending event")
                continue
            }

            const startDiff = now.diff(start, 'minutes').toObject()
            if (startDiff.minutes < 1 && startDiff.minutes > 0) {
                await this.startEvent(events[i])
                console.log("Starting event")
            }
        }
    }

    
    async createEvent(eventData) {
        const event = new BotEvent(eventData)
        await event.save()
    }
    
    async startEvent(event) {
        if (await this.isEventGoing()) {
            await this.#sendMessage('1event started')
            logger.error(`Cannot start the event with id - ${event._id}! There is another event going right now`)
            return false
        } else {
            let eventDoc = await getEvent(event._id)
            eventDoc.now = true
            await eventDoc.save()
            switchEvent(true, eventDoc)
            await this.#sendMessage('event started')
        }
        
    }
    async endEvent(event) {
        let eventDoc = await getEvent(event._id)
        eventDoc.now = false
        eventDoc.completed = true
        await eventDoc.save()
        switchEvent(false, eventDoc)
        await this.#sendMessage('event ended')
    }
    
    async isEventGoing() {
        const events = await getEvents()
        for (let i = 0; i < events.length; i++) {
            if (events[i].now === true) {
                switchEvent(true, events[i])
                return true
            }
        }
    }
    
    async getCurrentEvent() {
        const events = await getEvents()
        for (let i = 0; i < events.length; i++) {
            if (events[i].now === true) {
                return events[i]
            }
        }
    }
    
    async #sendMessage(message) {
        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
    }
    
    async handleExpEvent(userid, type) {
        if (!eventGoing || botEvent.type !== "exp") {
            return
        }
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
            case "item": {
                await inc.items(userid)
                break
            }
            default: {
                break
            }
        }
    }
    
}
const c = new EventsCoordinator()
await c.createEvent({
    startTime: DateTime.fromISO('2024-03-05T08:27:00.000Z'),
    endTime: DateTime.fromISO('2024-03-05T08:27:00.000Z'),
    type: "exp",
    active: true,
    now: false,
    meta: {
        multiplier: 2,
        eventName: 'Happy sunday',

    }
})
await c.checkForEvent()

