import fs from "fs";

const patchnotesFolder = 'resources/patchnotes/';
async function getAllPatchnotes() {
  let patchnotes = []
  fs.readdirSync(patchnotesFolder).forEach(file => {
    patchnotes.push(file)
  });
  return patchnotes
}
