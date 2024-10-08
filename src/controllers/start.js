import {randomUUID} from 'node:crypto';
import {ReturnState} from './_base.js';

const startController = (request) => {
  // The start page is where our cookie banner is placed, so by progressing past
  // this page, we know the user's seen the banner, so we don't need to show it
  // again.
  request.session.seenCookie = true;

  // Create a UUID so we can mitigate the risk of a replay attack.
  request.session.uuid = randomUUID();

  // The only way out of the start page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {startController as default};
