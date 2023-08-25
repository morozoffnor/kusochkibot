import fs from "fs";
import {createNewName} from "./database.mjs";

export async function fileToJson() {
  const file = fs.readFileSync('/Users/igormorozov/Downloads/cocknames.txt')
  const str = file.toString()
  const lines = str.split('\n')
  for (let i = 0; i < lines.length; i++) {
    await createNewName({
      title: lines[i],
      addedAt: Date.now(),
      addedBy: 0
    })
    console.log('added ' + lines[i])
  }
}

// fileToJson()