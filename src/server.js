// Load the config.
import config from './config.js';
import {counterpart100yearToken} from './http-request.js';

// Load the app.
import app from './app.js';

// Run it.
app.listen(config.port, () => {
  console.log(`Server listening on http://localhost:${config.port}${config.pathPrefix}.`);
  if (process.env.TRR_TEST) {
    console.log(
      `Log in with http://localhost:${config.port}${config.pathPrefix}/renewal?token=${counterpart100yearToken}`
    );
  }
});
