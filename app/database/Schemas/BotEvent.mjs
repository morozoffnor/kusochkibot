import {model, Schema} from 'mongoose';

const EventSchema = new Schema({
    startTime: Date,
    endTime: Date,
    type: String,
    active: Boolean,
    now: Boolean,
    completed: Boolean,
    meta: {}
});

export const BotEvent = model('BotEvent', EventSchema);
