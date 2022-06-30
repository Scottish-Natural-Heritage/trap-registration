import express from 'express';
// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import GdprController from './controllers/gdpr.js';
import ConvictionController from './controllers/conviction.js';
import EligibleController from './controllers/eligible.js';
import GeneralController from './controllers/general.js';
import ComplyController from './controllers/comply.js';
import MeatbaitController from './controllers/meat-bait.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';

// Configure all of the pages and routes.

const router = express.Router();

router.use(
  Page({
    path: 'start',
    positiveForward: 'gdpr',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'gdpr',
    back: 'start',
    positiveForward: 'conviction',
    controller: GdprController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'gdpr',
    positiveForward: 'eligible',
    negativeForward: 'conviction-stop',
    controller: ConvictionController
  })
);

router.use(
  Page({
    path: 'eligible',
    back: 'conviction',
    positiveForward: 'general',
    controller: EligibleController
  })
);

router.use(
  Page({
    path: 'general',
    back: 'eligible',
    positiveForward: 'comply',
    controller: GeneralController
  })
);

router.use(
  Page({
    path: 'comply',
    back: 'general',
    positiveForward: 'meat-bait',
    controller: ComplyController
  })
);

router.use(
  Page({
    path: 'meat-bait',
    back: 'comply',
    positiveForward: 'details',
    negativeForward: 'details',
    controller: MeatbaitController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'meat-bait',
    positiveForward: 'confirm',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'details',
    positiveForward: 'success',
    controller: ConfirmController
  })
);

router.use(
  Page({
    path: 'success'
  })
);

router.use(
  Page({
    path: 'conviction-stop',
    back: 'conviction'
  })
);

router.use(
  Page({
    path: 'accessibility'
  })
);

export {router as default};
