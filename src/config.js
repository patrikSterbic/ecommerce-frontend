require("babel-polyfill");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const exportedConfiguration = {
  development: {
    isTestVersion: true,
    isProduction: false,
    useSagaMonitor: false,
    backendTestApi: {
      useSsl: false,
      host: "localhost",
      basePath: "/api",
      apiKey: "",
      port: 8000,
      logRequests: true,
      timeout: 100000
    }
  },
  production: {
    isProduction: true,
    isTestVersion: false,
    backendApi: {
      useSsl: false,
      host: "someproductionaddress",
      basePath: "/api",
      apiKey: "",
      logRequests: true,
      timeout: 100000
    }
  }
}[process.env.NODE_ENV || "development"];

global.setProductionDevApiConfig = (apiConfigKey, apiConfig) => {
  exportedConfiguration[apiConfigKey] = apiConfig;
  console.log("Configuration has been set", exportedConfiguration);
};

export default exportedConfiguration;
