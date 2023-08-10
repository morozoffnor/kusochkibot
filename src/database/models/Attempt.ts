import { Schema, model, connect } from 'mongoose';

interface IAttempt {
    userid: Number;
    userName: String;
    size: Number;
    time: Date;
}

const AttemptSchema = new Schema<IAttempt>({
    userid: {type: Number, required: true},
    userName: {type: String, required: true},
    size: {type: Number, required: true},
    time: {type: Date, required: true}
});

const Attempt = model<IAttempt>('Attempt', AttemptSchema);

module.exports = Attempt