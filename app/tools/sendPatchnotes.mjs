import {bot} from "../main.mjs";
import {config} from "../config.mjs";


export async function sendPatchnotes(release) {
    let body = getHeaderString(release) + toEscapeMSg(release['body'].toString())
    await bot.telegram.sendMessage(config.chatId, `${body}`, {parse_mode: "Markdown"})
}

function toEscapeMSg(str) {
    return str
      .replace("^#+\s+(.+?)\s*$", "**")
      .replace("^\\s*=+\\s*$", "")
      .replace("^\\s*-+\\s*$", "")
      .replace(/##/g, "")
      .replace(/@/g, "")
      .replace(/\*\*/gm, "*")
}

function getHeaderString(release) {
    return `* New release: ${release['name']}*\n\n[Github link](${release['html_url']})\n\n`
}