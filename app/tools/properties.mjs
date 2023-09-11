import {getProperties} from "../database/database.mjs";
import {config} from "../config.mjs";

export async function initProperties() {
  let properties = await getProperties()
  if (!properties) {
    await createProperties()
  } else{
    config.openAIIntegration = properties.openAIIntegration
    config.cockSizeUsageCooldown = properties.sizesCooldown
  }
}


async function createProperties() {
  const prop = new Prop({
    sizesCooldown: config.cockSizeUsageCooldown,
    latestChangelogTag: null,
    openAIIntegration: true
  })
  await prop.save()
}