import fs from "fs";
import mainConfig from "../config";

export function ensureDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
}

export function getBackendApiConfig() {
  if (mainConfig.isTestVersion) {
    return mainConfig.backendTestApi;
  }
  return mainConfig.backendApi;
}
