const fs = require("fs");
const path = require("path");

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function readMatchJSONs(matchesRoot) {
  const results = [];

  const matchFolders = fs.readdirSync(matchesRoot);

  for (const folder of matchFolders) {
    const folderPath = path.join(matchesRoot, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const matchFilePath = path.join(folderPath, "match.json");

    if (!fs.existsSync(matchFilePath)) continue;

    const content = JSON.parse(
      fs.readFileSync(matchFilePath, "utf-8")
    );

    results.push(content);
  }

  return results;
}

module.exports = {
  readJSON,
  readMatchJSONs
};
