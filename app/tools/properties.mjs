import {getProperties} from "../database/database.mjs";
import {config} from "../config.mjs";
import {Prop} from "../database/Schemas/Prop.mjs";
import {logger} from "./logger.mjs";

export async function initProperties() {
    let properties = await getProperties()
    if (!properties) {
        logger.info("Properties not found, creating...")
        await createProperties()
    } else {
        config.openAIIntegration = properties.openAIIntegration
        config.cockSizeUsageCooldown = properties.sizesCooldown
    }
}


async function createProperties() {
    const prop = new Prop({
        sizesCooldown: config.cockSizeUsageCooldown,
        latestChangelogTag: null,
        openAIIntegration: false,
        yakuzaMention: Date.now()
    })
    await prop.save()
    logger.info("Created properties")
}