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

async function getLastPostedChangelog() {
  const properties = await getProperties()
  if (!properties.latestChangelogTag) {
    return 0
  } else {
    return parseInt(properties.latestChangelogTag)
  }
}