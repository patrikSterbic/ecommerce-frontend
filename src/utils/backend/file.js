import fs from "fs";
import fse from "fs-extra";
import request from "request";
import uuidV4 from "uuid/v4";
import { getApiResourcePath, logApiCall } from "./common";

//
// Private
//

function getRequestHeaders(apiConfig, tokenStore, callId) {
  return new Promise((resolve, reject) => {
    if (tokenStore) {
      return tokenStore
        .getAccessToken()
        .then(token => {
          resolve();
        })
        .catch(err => reject(err));
    }

    resolve();
  });
}

function downloadFile(
  apiConfig,
  method,
  resource,
  filePath,
  urlParams,
  data,
  overwrite,
  tokenStore
) {
  return new Promise((resolve, reject) => {
    const callId = uuidV4();
    const resourcePath = getApiResourcePath(apiConfig, resource, urlParams);

    if (apiConfig.logRequests) {
      logApiCall(
        `${method.toUpperCase()}-DOWNLOAD`,
        resourcePath,
        callId,
        data
      );
    }

    if (overwrite && fs.existsSync(filePath)) {
      fse.removeSync(filePath);
    }

    return getRequestHeaders(apiConfig, tokenStore, callId)
      .then(headers => {
        if (method === "GET") {
          return request({
            url: resourcePath,
            headers
          })
            .on("error", err => reject(err))
            .on("response", response => {
              if (response.statusCode !== 200) {
                fse.removeSync(filePath);

                reject({
                  status: response.statusCode,
                  message: `${response.statusCode} - ${response.statusMessage}`
                });
              }
            })
            .on("end", () => resolve())
            .pipe(fs.createWriteStream(filePath));
        }

        /* eslint-disable */
        return request({
          url: resourcePath,
          method,
          json: data,
          headers
        })
          .on("error", err => reject(err))
          .on("response", response => {
            if (response.statusCode !== 200) {
              fse.removeSync(filePath);

              reject({
                status: response.statusCode,
                message: `${response.statusCode} - ${response.statusMessage}`,
                callId
              });
            }
          })
          .on("end", () => resolve())
          .pipe(fs.createWriteStream(filePath));
      })
      .catch(reject);
  });
}

//
// Public
//

/**
 * Function - GET request on backend api for file download
 * @param {object} apiConfig - Configuration of backnd api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request (/smlouva/1/prilohy)
 * @param {string} filePath - Path to download file
 * @param {object} - Object {urlParams, overwrite, tokenStore}.
 * urlParams = Url parameter to query string.
 * overwrite = (default = true)
 * @returns {*} Promise
 */
function downloadFileGet(
  apiConfig,
  resource,
  filePath,
  { urlParams, overwrite, tokenStore } = {}
) {
  if (overwrite === null || overwrite === undefined) {
    overwrite = true;
  }
  return downloadFile(
    apiConfig,
    "GET",
    resource,
    filePath,
    urlParams,
    null,
    overwrite,
    tokenStore
  );
}

/**
 * Function POST request on backned api for file download
 * @param {object} apiConfig - Configuration of backnd api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request (/smlouva/1/prilohy)
 * @param {string} filePath - Path to download file
 * @param {object} - Object {urlParams, overwrite, tokenStore}.
 * data = request JSON body
 * urlParams = Url parameters to to query param
 * overwrite = (default = true)
 * @returns {*} Promise
 */
function downloadFilePost(
  apiConfig,
  resource,
  filePath,
  { urlParams, data, overwrite, tokenStore } = {}
) {
  if (overwrite === null || overwrite === undefined) {
    overwrite = true; // eslint-disable-line
  }
  return downloadFile(
    apiConfig,
    "POST",
    resource,
    filePath,
    urlParams,
    data,
    overwrite,
    tokenStore
  );
}

/**
 * Function PUT request on backned api for file download
 * @param {object} apiConfig - Configuration of backnd api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request (/smlouva/1/prilohy)
 * @param {string} filePath - Path to download file
 * @param {object} - Object {urlParams, overwrite, tokenStore}.
 * data = request JSON body
 * urlParams = Url parameters to to query param
 * overwrite = (default = true)
 * @returns {*} Promise
 */
function downloadFilePut(
  apiConfig,
  resource,
  filePath,
  { urlParams, data, overwrite, tokenStore } = {}
) {
  if (overwrite === null || overwrite === undefined) {
    overwrite = true; // eslint-disable-line
  }
  return downloadFile(
    apiConfig,
    "PUT",
    resource,
    filePath,
    urlParams,
    data,
    overwrite,
    tokenStore
  );
}

export { downloadFileGet, downloadFilePost, downloadFilePut };
