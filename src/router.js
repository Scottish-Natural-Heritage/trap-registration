import express from 'express';
// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import ConvictionController from './controllers/conviction.js';
import GeneralController from './controllers/general.js';
import MeatbaitController from './controllers/meat-bait.js';
import DetailsController from './controllers/details.js';
import confirmEmailController from './controllers/confirm-email.js';
import ConfirmController from './controllers/confirm.js';
import PostcodeController from './controllers/postcode.js';
import AddressController from './controllers/address.js';
import ManualAddressController from './controllers/manual-address.js';
import RenewalIntroController from './controllers/renewal-intro.js';
import RenewalEmailController from './controllers/renewal-email.js';
import RenewalEmailSuccessController from './controllers/renewal-email-success.js';
import renewalLoginController from './controllers/renewal-login.js';
import RenewalCheckAnswersController from './controllers/renewal-check-answers.js';
import RenewalSuccessController from './controllers/renewal-success.js';

// Configure all of the pages and routes.

const router = express.Router();

router.use(
  Page({
    path: 'start',
    primaryForward: 'conviction',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'start',
    backRenewal: 'renewal-check-answers',
    primaryForward: 'general',
    secondaryForward: 'conviction-stop',
    tertiaryForward: 'renewal-check-answers',
    controller: ConvictionController
  })
);

router.use(
  Page({
    path: 'general',
    back: 'conviction',
    backRenewal: 'renewal-check-answers',
    primaryForward: 'meat-bait',
    secondaryForward: 'renewal-check-answers',
    controller: GeneralController
  })
);

router.use(
  Page({
    path: 'meat-bait',
    back: 'general',
    backRenewal: 'renewal-check-answers',
    primaryForward: 'details',
    secondaryForward: 'details',
    tertiaryForward: 'renewal-check-answers',
    controller: MeatbaitController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'meat-bait',
    backRenewal: 'renewal-check-answers',
    primaryForward: 'confirm-email',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm-email',
    back: 'details',
    backRenewal: 'details',
    primaryForward: 'postcode',
    secondaryForward: 'renewal-check-answers',
    controller: confirmEmailController
  })
);

router.use(
  Page({
    path: 'postcode',
    back: 'confirm-email',
    backRenewal: 'renewal-check-answers',
    primaryForward: 'address',
    controller: PostcodeController
  })
);

router.use(
  Page({
    path: 'address',
    back: 'postcode',
    backRenewal: 'postcode',
    primaryForward: 'confirm',
    secondaryForward: 'manual-address',
    tertiaryForward: 'renewal-check-answers',
    controller: AddressController
  })
);

router.use(
  Page({
    path: 'manual-address',
    back: 'address',
    backRenewal: 'address',
    primaryForward: 'confirm',
    secondaryForward: 'renewal-check-answers',
    controller: ManualAddressController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'address',
    primaryForward: 'success',
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

// Renewal start pages
router.use(
  Page({
    path: 'renewal-intro',
    positiveForward: 'renewal-email',
    controller: RenewalIntroController
  })
);

router.use(
  Page({
    path: 'renewal-email',
    back: 'renewal-intro',
    positiveForward: 'renewal-email-success',
    controller: RenewalEmailController
  })
);

router.use(
  Page({
    path: 'renewal-email-success',
    back: 'renewal-email',
    positiveForward: 'renewal-login',
    controller: RenewalEmailSuccessController
  })
);

router.use(
  Page({
    path: 'renewal-login',
    primaryForward: 'renewal-check-answers',
    controller: renewalLoginController
  })
);

router.use(
  Page({
    path: 'renewal-check-answers',
    back: 'renewal-login',
    primaryForward: 'renewal-success',
    controller: RenewalCheckAnswersController
  })
);

router.use(
  Page({
    path: 'renewal-success',
    back: 'renewal-check-answers',
    controller: RenewalSuccessController
  })
);

export {router as default};
