import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {getEvent, getEvents} from "../database/database.mjs";
import {EventsCoordinator} from "../events/EventsCoordinator.mjs";
import {BotEvent} from "../database/Schemas/BotEvent.mjs";

let EventsRouter = new express.Router()

EventsRouter.use(tokenChecker)

// Get all events
EventsRouter.get('/', express.json({type: 'application/json'}), async (req, res) => {
    const events = await getEvents()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({events: events})
})

// Get current event
EventsRouter.get('/now', express.json({type: 'application/json'}), async (req, res) => {
    const event = await new EventsCoordinator().getCurrentEvent()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({event: event})
})

EventsRouter.post('/start',express.json({type: 'application/json'}), async (req, res) => {
    const event = req.body
    const c = new EventsCoordinator()
    if (await c.startEvent(await getEvent(event['id']))) {
        res.status(200).send('OK')
    } else {
        res.status(409).send('NOT OK')
    }
})

EventsRouter.post('/end',express.json({type: 'application/json'}), async (req, res) => {
    const event = req.body
    const c = new EventsCoordinator()
    await c.endEvent(await getEvent(event['id']))
    res.status(200).send('OK')
})

EventsRouter.post('/create',express.json({type: 'application/json'}), async (req, res) => {
    const event = req.body
    const c = new EventsCoordinator()
    await c.createEvent(event)
    res.status(200).send('OK')
})

export default EventsRouter