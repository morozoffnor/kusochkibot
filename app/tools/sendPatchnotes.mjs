import {bot} from "../main.mjs";
import {config} from "../config.mjs";
import {logger} from "./logger.mjs";


export async function sendPatchnotes(release) {
    if (release['prerelease']) {
        logger.info('Received pre-release, skipping')
        return
    }
    if (release['draft']) {
        logger.info('Received draft release, skipping')
        return
    }
    logger.info(toEscapeMSg(release['body'].toString()))
    let body = getHeaderString(release) + toEscapeMSg(release['body'].toString()) + `\n[Github link](${release['html_url']})\n\n`
    await bot.telegram.sendMessage(config.chatId, `${body}`, {parse_mode: "Markdown"})
}

function toEscapeMSg(str) {
    return str
      // .replace(/by @\w* in https:\S*\\r/gm, "\n")
      .replace("^#+\s+(.+?)\s*$", "**")
      .replace("^\\s*=+\\s*$", "")
      .replace("^\\s*-+\\s*$", "")
      .replace(/##/g, "")
      .replace(/\*\*/gm, "*")
      .replace(/\* /gm, "- ")
      .replace(/https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi, "")
      .replace(/by @\w* in /gi, "")
      
}



function getHeaderString(release) {
    return `* New release: ${release['name']}*\n\n`
}