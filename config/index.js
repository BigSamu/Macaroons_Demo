const API_URL_PREFIX = process.env.NEXT_PUBLIC_API_URL_PREFIX;
const CLIENT_DOMAIN_URL_PRODUCTION =
  process.env.NEXT_PUBLIC_CLIENT_DOMAIN_URL_PRODUCTION;
const CLIENT_DOMAIN_URL_DEVELOPMENT =
  process.env.NEXT_PUBLIC_CLIENT_DOMAIN_URL_DEVELOPMENT;
const API_DOMAIN_URL_DEVELOPMENT =
  process.env.NEXT_PUBLIC_API_DOMAIN_URL_DEVELOPMENT;

export const API_URL =
  process.env.NODE_ENV === "production"
    ? `${CLIENT_DOMAIN_URL_PRODUCTION}/${API_URL_PREFIX}` // serverless deployment does redirection to api
    : `${API_DOMAIN_URL_DEVELOPMENT}/${API_URL_PREFIX}`;

export const STATIC_URL =
  process.env.NODE_ENV === "production"
    ? `${CLIENT_DOMAIN_URL_PRODUCTION}/${API_URL_PREFIX}/static` // serverless deployment does redirection to api
    : `${API_DOMAIN_URL_DEVELOPMENT}/${API_URL_PREFIX}/static`;

export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? CLIENT_DOMAIN_URL_PRODUCTION
    : CLIENT_DOMAIN_URL_DEVELOPMENT;
