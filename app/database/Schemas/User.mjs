import {Schema, model} from 'mongoose';
import {AttemptSchema} from "./Attempt.mjs";

const UserSchema = new Schema({
    userid: {type: Number, required: true},
    userName: {type: String},
    lastAttempt: AttemptSchema,
    attemptCount: {type: Number},
    money: {type: Number, default: 100},
    stats: {
        messagesSent: {type: Number},
        imagesSent: {type: Number},
        voicesSent: {type: Number},
        stickersSent: {type: Number},
        videosSent: {type: Number},
        circlesSent: {type: Number},
        pollsSent: {type: Number},
        botUses: {type: Number},
        itemsUsed: {type: Number},
        yakuza: {type: Number}
    },
    cockStats: {
        currentSize: {type: Number},
        lowestSize: {type: Number},
        highestSize: {type: Number},
        wins: {type: Number},
        wonLastTime: {type: Boolean}
    },
    items: [],
    activatedItem: {},
    cockStatsBackup: {},
    lvl: {
        exp: {type: Number, default: 1000},
        lvl: {type: Number, default: 1},
        history: []
    }
})

export const User = model('User', UserSchema)