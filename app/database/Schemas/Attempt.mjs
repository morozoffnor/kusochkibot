import { Schema, model, connect } from 'mongoose';


const AttemptSchema = new Schema({
    userid: {type: Number, required: true},
    userName: {type: String, required: true},
    cockName: {type: String, required: true},
    size: {type: Number, required: true},
    time: {type: Date, required: true}
});

const Attempt = model('Attempt', AttemptSchema);

module.exports = Attempt