const ENV = {
  development: {
    API_URL: "http://192.168.100.19:3002",
  },
  staging: {
    API_URL: "http://192.168.100.19:3002",
  },
  production: {
    API_URL: "http://192.168.100.19:3002",
  },
};

const getEnvVars = (
  env: "development" | "staging" | "production" = (process.env.NODE_ENV as
    | "development"
    | "staging"
    | "production") || "development"
) => {
  if (env === "development") {
    return ENV.development;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "production") {
    return ENV.production;
  }
};

export default getEnvVars;
