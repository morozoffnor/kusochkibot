import { Schema, model } from 'mongoose';

const PropSchema = new Schema({
  sizesCooldown: {type: Number},
  latestChangelogTag: {type: Number},
  openAIIntegration: {type: Boolean},
  yakuzaMention: {type: Date}
})

export const Prop = model('Prop', PropSchema)