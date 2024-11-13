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

// Configure all of the pages and routes.
const router = express.Router();

router.use(
  Page({
    path: 'start',
    positiveForward: 'conviction',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'start',
    positiveForward: 'general',
    negativeForward: 'conviction-stop',
    controller: ConvictionController
  })
);

router.use(
  Page({
    path: 'general',
    back: 'conviction',
    positiveForward: 'meat-bait',
    controller: GeneralController
  })
);

router.use(
  Page({
    path: 'meat-bait',
    back: 'general',
    positiveForward: 'details',
    negativeForward: 'details',
    controller: MeatbaitController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'meat-bait',
    positiveForward: 'confirm-email',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm-email',
    back: 'details',
    positiveForward: 'postcode',
    controller: confirmEmailController
  })
);

router.use(
  Page({
    path: 'postcode',
    back: 'confirm-email',
    positiveForward: 'address',
    controller: PostcodeController
  })
);

router.use(
  Page({
    path: 'address',
    back: 'postcode',
    positiveForward: 'confirm',
    negativeForward: 'manual-address',
    controller: AddressController
  })
);

router.use(
  Page({
    path: 'manual-address',
    back: 'address',
    positiveForward: 'confirm',
    controller: ManualAddressController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'address',
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

// Renewal start pages.

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
    positiveForward: 'renewal-check-answers',
    controller: renewalLoginController.post,
    getController: renewalLoginController.get
  })
);

router.use(
  Page({
    path: 'renewal-check-answers',
    back: 'renewal-login',
    positiveForward: 'renewal-success',
    controller: RenewalCheckAnswersController.post,
    getController: RenewalCheckAnswersController.get
  })
);

router.use(
  Page({
    path: 'renewal-success'
  })
);

// Renewal change pages.

router.use(
  Page({
    path: 'renewal-details',
    back: 'renewal-check-answers',
    positiveForward: 'renewal-confirm-email',
    controller: DetailsController,
    template: 'details'
  })
);

router.use(
  Page({
    path: 'renewal-confirm-email',
    back: 'renewal-details',
    positiveForward: 'renewal-check-answers',
    controller: confirmEmailController,
    template: 'confirm-email'
  })
);

router.use(
  Page({
    path: 'renewal-postcode',
    back: 'renewal-check-answers',
    positiveForward: 'renewal-address',
    controller: PostcodeController,
    template: 'postcode'
  })
);

router.use(
  Page({
    path: 'renewal-address',
    back: 'renewal-postcode',
    positiveForward: 'renewal-check-answers',
    negativeForward: 'renewal-manual-address',
    controller: AddressController,
    template: 'address'
  })
);

router.use(
  Page({
    path: 'renewal-manual-address',
    back: 'renewal-address',
    positiveForward: 'renewal-check-answers',
    controller: ManualAddressController,
    template: 'manual-address'
  })
);

router.use(
  Page({
    path: 'renewal-conviction',
    back: 'renewal-check-answers',
    positiveForward: 'renewal-check-answers',
    negativeForward: 'renewal-conviction-stop',
    controller: ConvictionController,
    template: 'conviction'
  })
);

router.use(
  Page({
    path: 'renewal-general',
    back: 'renewal-check-answers',
    positiveForward: 'renewal-check-answers',
    controller: GeneralController,
    template: 'general'
  })
);

router.use(
  Page({
    path: 'renewal-meat-bait',
    back: 'renewal-check-answers',
    positiveForward: 'renewal-check-answers',
    negativeForward: 'renewal-check-answers',
    controller: MeatbaitController,
    template: 'meat-bait'
  })
);

router.use(
  Page({
    path: 'renewal-conviction-stop',
    back: 'renewal-conviction',
    template: 'conviction-stop'
  })
);

export {router as default};
