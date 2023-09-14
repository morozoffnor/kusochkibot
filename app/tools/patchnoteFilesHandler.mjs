import fs from "fs";

/**
 * A directory where patchnotes are stored
 * @type {string}
 */
const patchnotesFolder = 'resources/patchnotes/';

/**
 * Gets patchnote files from resources folder
 * @type {function}
 * @returns An array of filenames
 */
async function getAllPatchnotes() {
  let patchnotes = []
  fs.readdirSync(patchnotesFolder).forEach(file => {
    patchnotes.push(file)
  });
  return patchnotes
}

/**
 * Converts filenames to array of numbers
 * @return {Promise<*[]>}
 * @returns An array of numbers
 */
async function stripPatchnoteFiles() {
  const patchnoteFiles = getAllPatchnotes()
  let patchnotes = []
  patchnoteFiles.forEach((patchnote) => {
    patchnote.slice(0, -3)
    patchnotes.push(parseInt(patchnote))
  })
  patchnotes.sort((a, b) => b - a);
  return patchnotes
}

/**
 * Gets latest patchnote in resources folder
 * @return {Promise<Number>}
 * @returns A number representing latest version patchnote
 */
export async function getLatestPatchnote() {
  const patchnotes = stripPatchnoteFiles()
  return patchnotes[0]
}


