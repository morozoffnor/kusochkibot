import { Schema, model } from 'mongoose';

const PropSchema = new Schema({
  sizesCooldown: {type: Number},
  latestChangelogTag: {type: String}
})

export const Prop = model('Prop', PropSchema)