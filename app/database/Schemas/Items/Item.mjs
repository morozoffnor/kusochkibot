import {model, Schema} from 'mongoose';


export const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    rarity: {type: String, required: true},
    type: {type: String, required: true},
    subtype: {type: String},
    effect: {
        descriptions: {type: [String], required: true},
        alert: {type: String},
        title: {type: String}
    },
    createdBy: {type: Number},
    icon: {type: String, required: true},
    multiplier: {type: Number},
    effectInfo: {},
    receivedAt: {type: Date, required: true, default: Date.now()}
});


export const Item = model('Item', ItemSchema);
