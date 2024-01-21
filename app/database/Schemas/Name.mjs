import {model, Schema} from 'mongoose';

const NameSchema = new Schema({
    title: String,
    addedAt: Date,
    addedBy: Number
})

export const Name = model('Name', NameSchema)