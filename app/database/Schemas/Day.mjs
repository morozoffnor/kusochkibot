import {model, Schema} from 'mongoose';

const DaySchema = new Schema({
    date: Date,
    attempts: []
});


DaySchema.method.addAttempt = async function (attemptData) {
    this.attempts.push(attemptData)
}

export const Day = model('Day', DaySchema);
