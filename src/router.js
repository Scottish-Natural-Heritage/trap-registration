import express from 'express';
// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import ApplyController from './controllers/apply.js';
import RegistrationController from './controllers/registration.js';
import RegistrationPostcodeController from './controllers/registration-postcode.js';
import RegistrationSuccessController from './controllers/registration-success.js';
import ConvictionController from './controllers/conviction.js';
import GeneralController from './controllers/general.js';
import MeatbaitController from './controllers/meat-bait.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';
import PostcodeController from './controllers/postcode.js';
import AddressController from './controllers/address.js';
import ManualAddressController from './controllers/manual-address.js';

// Configure all of the pages and routes.

const router = express.Router();

router.use(
  Page({
    path: 'start',
    positiveForward: 'apply',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'apply',
    back: 'start',
    positiveForward: 'conviction',
    negativeForward: 'registration',
    controller: ApplyController
  })
);

router.use(
  Page({
    path: 'registration',
    back: 'apply',
    positiveForward: 'registration-postcode',
    controller: RegistrationController
  })
);

router.use(
  Page({
    path: 'registration-postcode',
    back: 'registration',
    positiveForward: 'registration-success',
    controller: RegistrationPostcodeController
  })
);

router.use(
  Page({
    path: 'registration-success',
    back: 'registration-postcode',
    positiveForward: '',
    controller: RegistrationSuccessController
  })
);

router.use(
  Page({
    path: 'conviction',
    back: 'apply',
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
    positiveForward: 'postcode',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'postcode',
    back: 'details',
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

router.use(
  Page({
    path: 'privacy-policy'
  })
);

export {router as default};
