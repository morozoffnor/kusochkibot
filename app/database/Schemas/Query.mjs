import {Schema, model} from 'mongoose';

const QuerySchema = new Schema({
    userId: Number,
    size: Number,
    cockName: String,
    time: Date,
    item: {}
})

export const Query = model('Query', QuerySchema)