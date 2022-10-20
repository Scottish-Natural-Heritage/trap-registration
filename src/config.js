import process from 'node:process';

// Grab our config from the env vars, or set some defaults if they're missing.
const config = Object.freeze({
  port: process.env.TR_PORT || '3000',
  sessionSecret: process.env.TR_SESSION_SECRET || 'override_this_value',
  apiEndpoint: process.env.TR_API_URL || 'http://localhost:3001/trap-registration-api/v1/registrations',
  hostPrefix: process.env.TR_HOST_PREFIX || `http://localhost:${process.env.TR_PORT}`,
  pathPrefix: process.env.TR_PATH_PREFIX ? `/${process.env.TR_PATH_PREFIX}` : '/trap-registration',
  cookiePrefix: process.env.COOKIE_PREFIX || ''
});

export {config as default};
