import {model, Schema} from 'mongoose';


export const ResultsPhraseSchema = new Schema({
    addedBy: {},
    phrase: {
        title: {type: String, required: true},
        firstPlace: {type: String},
        secondPlace: {type: String},
        thirdPlace: {type: String},
        bottom: {type: String}
    },
    addedAt: {type: Date, required: true, default: Date.now()},
});



export const ResultsPhrase = model('ResultsPhrase', ResultsPhraseSchema);
