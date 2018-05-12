import superagent from 'superagent/superagent';
import uuidV4 from 'uuid/v4';
import { backendApi as backendApiConfig } from 'config';

import {
  logApiCall,
  logApiResult,
  handleRequestError
} from './common';

export default class BackendApiTokenStore {
  constructor(tokenCredentials, token) {
    this.tokenCredentials = tokenCredentials || {};
    this.accessToken = token || '';
  }

  getAccessToken() {
    if (!this.accessToken) {
      return this._requestNewAccessToken();
    }
    return Promise.resolve(this.accessToken);
  }

  setTokenCredentials(credentials) {
    this.tokenCredentials = credentials;
  }

  rehydrateAccessToken() {
    // Make request to backend api /authenticate/token
    this.accessToken = null;
    return this._requestNewAccessToken();
  }

  //
  // Private
  //

  _requestNewAccessToken() {
    const tokenApiUrl = this._getTokenBackendApiUrl();
    const clientIdAndSecret = this._getClientIdAndSecret();
    const callId = uuidV4();

    return new Promise((resolve, reject) => {
      if (backendApiConfig.logRequests) {
        logApiCall('POST', tokenApiUrl, callId, 'SECRET');
      }

      const request = superagent
        .post(tokenApiUrl)
        .set('Content-Type', 'application/json')
        .set('X-Api-RequestId', callId);

      request.send({
        clientId: clientIdAndSecret.tokenClientId,
        clientSecret: clientIdAndSecret.tokenClientSecret
      });

      request.end((err, response) => {
        if (backendApiConfig.logRequests) {
          logApiResult('POST', tokenApiUrl, callId, 'SECRET', response);
        }

        if (err) {
          console.error(err);
          this._setAccessToken(null);

          if (response.statusCode === 401) { // Chyba autentikace, špatný clientId nebo clientSecret
            return reject({status: 401, message: `BACKEND API TOKEN ERROR - Status: ${response.statusCode}, Error: ${response.body.errorMessage}`});
          }
          return handleRequestError(err, tokenApiUrl, response, reject, callId);
        }

        this._setAccessToken(response.body.accessToken);
        return resolve(response.body.accessToken);
      });
    });
  }

  _setAccessToken(token) {
    this.accessToken = token;
  }

  _getClientIdAndSecret() {
    return this.tokenCredentials || {}; // Pokud náhodou není nastaveno budou na API zaslány prázdné hodnoty
  }

  _getTokenBackendApiUrl() {
    return `${backendApiConfig.useSsl ? 'https' : 'http'}://${backendApiConfig.host}:${backendApiConfig.port}${backendApiConfig.basePath}/api/v1/authenticate/token`; // eslint-disable-line
  }
}
