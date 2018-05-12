import querystring from "querystring";
import config from "../../config";

function getResponseErrorMessage(response) {
  if (response.body.InnerExceptionMessage || response.body.ExceptionMessage) {
    return JSON.stringify(
      response.body.InnerExceptionMessage || response.body.ExceptionMessage
    );
  }

  if (
    response.toJSON &&
    response.toJSON().headers["content-type"].indexOf("application/json") >= 0
  ) {
    const jsonResponse = JSON.parse(response.body);

    if (jsonResponse.Message) {
      return JSON.stringify(
        jsonResponse.InnerExceptionMessage || jsonResponse.ExceptionMessage
      );
    }
    return JSON.stringify(
      jsonResponse.InnerExceptionMessage || jsonResponse.ExceptionMessage
    );
  }

  return response.body;
}

function getRequestDataForLogging(requestData) {
  // V produkci potřebujeme logovag JSON, protože do těxťáku util.format nezaloguje nested objekt
  if (config.isProduction) {
    return JSON.stringify(requestData);
  }
  return requestData;
}

export function getApiBaseUrl(apiConfig) {
  return apiConfig.port
    ? `${apiConfig.useSsl ? "https" : "http"}://${apiConfig.host}:${
        apiConfig.port
      }${apiConfig.basePath}/`
    : `${apiConfig.useSsl ? "https" : "http"}://${apiConfig.host}${
        apiConfig.basePath
      }/`;
}

export function getApiResourcePath(apiConfig, resource, urlParmas) {
  let url = getApiBaseUrl(apiConfig) + resource;

  if (urlParmas) {
    url += `?${querystring.stringify(urlParmas)}`;
  }
  return url;
}

export function logApiCall(
  method,
  resourcePath,
  callId,
  requestData,
  requestFiles
) {
  if (requestData) {
    if (requestFiles) {
      console.info(
        `BACKEND API CALL [${method.toUpperCase()}] ${resourcePath}\nCallId: ${callId}`,
        getRequestDataForLogging(requestData),
        requestFiles
      );
    } else {
      console.info(
        `BACKEND API CALL [${method.toUpperCase()}] ${resourcePath}\nCallId: ${callId}`,
        getRequestDataForLogging(requestData)
      );
    }
  } else {
    if (requestFiles) {
      // eslint-disable-line
      console.info(
        `BACKEND API CALL [${method.toUpperCase()}] ${resourcePath}\nCallId: ${callId}`,
        requestFiles
      );
    } else {
      console.info(
        `BACKEND API CALL [${method.toUpperCase()}] ${resourcePath}\nCallId: ${callId}`
      );
    }
  }
}

export function logApiResult(method, resourcePath, callId, data, response) {
  console.info(
    `BACKEND API RESULT [${method.toUpperCase()}] ${resourcePath}\nStatus: ${
      response.statusCode
    } - ${response.statusText ||
      response.statusMessage}\nCallId: ${callId}\nData:`,
    getRequestDataForLogging(data)
  ); // eslint-disable-line
}

export function handleRequestFailure(response, resourcePath, reject, callId) {
  let resultData;

  if (response.statusCode === 401 || response.statusCode === 403) {
    // Chyba autentikace, špatný clientId nebo clientSecret
    resultData = {
      status: 401,
      message: `BACKEND API AUTH ERROR - Status: ${
        response.statusCode
      }, Error: ${response.statusText || response.statusMessage}`,
      data: response.body,
      isAuthError: true,
      callId
    };
  } else if (response.statusCode === 404) {
    resultData = {
      status: 404,
      message: `BACKEND API ERROR - Status: ${
        response.statusCode
      }, Error: ${response.body ||
        response.statusText ||
        response.statusMessage}, Url: ${resourcePath}`, // eslint-disable-line
      callId
    };
  } else if (response.statusCode === 400) {
    // Valiační chyba byckend api, just pass along...
    return reject(
      {
        status: 400,
        validationFailed: true,
        errors: response.body,
        callId
      },
      response
    );
  } else if (response.statusCode === 503) {
    // Zrovna nasazujeme appku soorryyyyy
    return reject(
      {
        status: 503,
        message: "503 - Service is unavailable, please try again later.",
        callId
      },
      response
    );
  } else {
    resultData = {
      status: response.statusCode,
      message: `BACKEND API ERROR - Status: ${
        response.statusCode
      }, Error: ${(response.body
        ? JSON.stringify(
            response.body.InnerExceptionMessage ||
              response.body.ExceptionMessage
          )
        : null) ||
        response.statusText ||
        response.statusMessage}`, // eslint-disable-line
      body: response.body ? response.body : [],
      callId
    };
  }

  console.warn(resultData, response.body);
  return reject(resultData);
}

export function handleRequestTimeout(resourcePath, reject, callId) {
  console.warn(`BACKEND API TIMEOUT: ${resourcePath}`);
  return reject({
    status: 0,
    message: "BACKEND API CALL TIMEOUT",
    callId
  });
}

export function handleRequestError(
  err,
  resourcePath,
  response,
  reject,
  callId
) {
  if (err && err.message && err.message.indexOf("network is offline") !== -1) {
    reject({
      status: 0,
      message: `BACKEND API UNAVAILABLE - NO CONNECTION ${err.url}`,
      callId
    });
  } else if (err && err.timeout) {
    handleRequestTimeout(resourcePath, reject, callId);
  } else if (err && err.response) {
    handleRequestFailure(err.response, resourcePath, reject, callId);
  } else {
    if (err) {
      // eslint-disable-line
      console.error(err);
      return reject(`BACKEND API CALL ERROR - ${err.message} ${err.url}`);
    }

    const errorMessage = `BACKEND API ERROR - Status: ${
      response.statusCode
    }, Error: ${(response.body ? getResponseErrorMessage(response) : null) ||
      response.statusText ||
      response.statusMessage}`; // eslint-disable-line
    console.warn(errorMessage);
    return reject({
      status: 0,
      message: errorMessage,
      callId
    });
  }
}

export function handleRequestSuccess(
  apiConfig,
  method,
  resourcePath,
  callId,
  data,
  response,
  resolve,
  logResponseBody
) {
  if (apiConfig.logRequests) {
    logApiResult(
      method,
      resourcePath,
      callId,
      logResponseBody !== false ? data : "not logged...",
      response
    );
  }

  return resolve(data, response);
}
