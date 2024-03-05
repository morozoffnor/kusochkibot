import {DateTime, Interval} from "luxon";
import {BotEvent} from "../database/Schemas/BotEvent.mjs";
import {getEvents, IncUserStats} from "../database/database.mjs";
import {bot, botEvent, eventGoing, switchEvent} from "../main.mjs";
import {config} from "../config.mjs";

export class EventsCoordinator {
    
    async checkForEvent() {
        console.log('checking event')
        const events = await getEvents()
        console.log(events.length)
        for (let i = 0; i < events.length; i++) {
            console.log(i)
            const start = DateTime.fromJSDate(events[i].startTime)
            
            console.log(start.toString())
            const now = DateTime.now()
            console.log('start ' + start.startOf("minute"))
            console.log('end ' + now.startOf("minute"))
            if (start.startOf("minute") === now.startOf("minute")) {
                console.log("YES")
            }
            const interval = Interval.fromDateTimes(start, now)
            console.log(interval)
            if (interval.length() < 1000) {
                console.log('yes')
                await this.startEvent(events[i])
                return
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
            return false
        } else {
            event.now = true
            await event.save()
            switchEvent(true)
            await this.#sendMessage('event started')
        }
        
    }
    async endEvent(event) {
        event.now = false
        event.completed = true
        await event.save()
        switchEvent(false, {})
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
    startTime: DateTime.fromISO('2024-03-01T18:13:00.000Z'),
    endTime: DateTime.fromISO('2024-02-26T14:09:00+00:00', {zone: 'Europe/Moscow'}),
    type: "exp",
    active: true,
    now: false,
    meta: {
        multiplier: 2,
        startTime: DateTime.fromISO('2024-02-26T14:08:00+00:00', {zone: 'Europe/Moscow'}),
    }
})
await c.checkForEvent()

