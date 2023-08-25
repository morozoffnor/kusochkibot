import { Schema, model } from 'mongoose';


export const AttemptSchema = new Schema({
    userid: {type: Number, required: true},
    userName: {type: String, required: true},
    cockName: {type: String, required: true},
    size: {type: Number, required: true},
    time: {type: Date, required: true}
});

AttemptSchema.method.getNameAndSize = function add(){
    return {
        name: this.cockName,
        size: this.size
    }
}

export const Attempt = model('Attempt', AttemptSchema);
