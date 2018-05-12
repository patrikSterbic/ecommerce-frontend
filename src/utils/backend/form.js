import fs from "fs";
import path from "path";
import requestLib from "request";
import superagent from "superagent/superagent"; // Explicitly ask for browser version of superagent
import uuidV4 from "uuid/v4";
import _ from "lodash";

import {
  getApiResourcePath,
  logApiCall,
  handleRequestError,
  handleRequestSuccess
} from "./common";

//
// Private
//

function getMultipartHeaders(apiConfig, tokenStore, callId) {
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

function setApiCallOptions(request, apiConfig, tokenStore, callId) {
  return new Promise((resolve, reject) => {
    request.timeout(apiConfig.timeout);

    if (tokenStore) {
      // Auth by user token
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

function makeApiCall(
  apiConfig,
  method,
  resource,
  urlParams,
  requestData,
  tokenStore,
  logResponseBody,
  cancellationToken
) {
  return new Promise((resolve, reject) => {
    const callId = uuidV4();
    const resourcePath = getApiResourcePath(apiConfig, resource, urlParams);

    if (apiConfig.logRequests) {
      logApiCall(method, resourcePath, callId, requestData);
    }

    const request = superagent[method](resourcePath).set(
      "Content-Type",
      "application/json"
    );

    if (_.isFunction(cancellationToken)) {
      cancellationToken(request);
    }

    setApiCallOptions(request, apiConfig, tokenStore, callId)
      .then(() => {
        if (requestData) {
          request.send(requestData);
        }

        request.end((err, response) => {
          if (err) {
            handleRequestError(err, resourcePath, response, reject, callId);
          } else {
            handleRequestSuccess(
              apiConfig,
              method,
              resourcePath,
              callId,
              response.body,
              response,
              resolve,
              logResponseBody
            );
          }
        });
      })
      .catch(reject);
  });
}

//
// Public
//

/**
 * Function GET request on backend api
 * @param {object} apiConfig - Configuration of api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request
 * @param {object} - Object { urlParams, tokenStore }. urlParams = Url parameters to query string, data = request JSON body
 * @returns {*} Promise
 */
function get(
  apiConfig,
  resource,
  { urlParams, tokenStore, logResponseBody, cancellationToken } = {}
) {
  console.log("API CONFIG");
  return makeApiCall(
    apiConfig,
    "get",
    resource,
    urlParams,
    null,
    tokenStore,
    logResponseBody,
    cancellationToken
  );
}

/**
 * Function PUT request on backend api
 * @param {object} apiConfig - Configuration of api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request
 * @param {object} - Object { urlParams, tokenStore }. urlParams = Url parameters to query string, data = request JSON body
 * @returns {*} Promise
 */
function putJson(
  apiConfig,
  resource,
  { urlParams, data, tokenStore, cancellationToken } = {}
) {
  return makeApiCall(
    apiConfig,
    "put",
    resource,
    urlParams,
    data,
    tokenStore,
    cancellationToken
  );
}

/**
 * Function POST request on backend api
 * @param {object} apiConfig - Configuration of api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request
 * @param {object} - Object { urlParams, tokenStore }. urlParams = Url parameters to query string, data = request JSON body
 * @returns {*} Promise
 */
function postJson(
  apiConfig,
  resource,
  { urlParams, data, tokenStore, logResponseBody, cancellationToken } = {}
) {
  return makeApiCall(
    apiConfig,
    "post",
    resource,
    urlParams,
    data,
    tokenStore,
    logResponseBody,
    cancellationToken
  );
}

/**
 * Function DELETE request on backend api
 * @param {object} apiConfig - Configuration of api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request
 * @param {object} - Object { urlParams, tokenStore }. urlParams = Url parameters to query string
 * @returns {*} Promise
 */
function del(
  apiConfig,
  resource,
  urlParams,
  { tokenStore, logResponseBody, cancellationToken } = {}
) {
  return makeApiCall(
    apiConfig,
    "del",
    resource,
    urlParams,
    null,
    tokenStore,
    logResponseBody,
    cancellationToken
  );
}

/**
 * Function POST for multipart request on backend api
 * @param {object} apiConfig - Configuration of api (baseUrl, apiKey, ...)
 * @param {string} resource - Resource of request
 * @param {object} - Object { urlParams, tokenStore }. urlParams = Url parameters to query string
 * @returns {*} Promise
 */
function postJsonMultipart(
  apiConfig,
  resource,
  { urlParams, data, files, tokenStore } = {}
) {
  return new Promise((resolve, reject) => {
    const callId = uuidV4();
    const resourcePath = getApiResourcePath(apiConfig, resource, urlParams);

    if (apiConfig.logRequests) {
      logApiCall("POST-MULTIPART", resourcePath, callId, data, files);
    }

    return getMultipartHeaders(apiConfig, tokenStore, callId).then(headers => {
      let multipartData = null;

      if (files) {
        multipartData = Object.keys(files).map(key => {
          const filePath = files[key];

          return {
            // eslint-disable-line
            body: fs.createReadStream(filePath),
            name: path.basename(filePath),
            "content-type": "application/octet-stream"
          };
        });
      } else {
        multipartData = [];
      }

      if (data) {
        // eslint-disable-line
        multipartData.push({
          body: JSON.stringify(data),
          "content-type": "application/json"
        });
      }

      requestLib(
        {
          headers,
          method: "POST",
          preambleCRLF: true,
          postambleCRLF: true,
          uri: resourcePath,
          multipart: multipartData
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            handleRequestError(error, resourcePath, response, reject, callId);
          } else {
            handleRequestSuccess(
              apiConfig,
              "POST-MULTIPART",
              resourcePath,
              callId,
              body,
              response,
              resolve
            );
          }
        }
      );
    });
  });
}

export { get, putJson, postJson, del, postJsonMultipart };
