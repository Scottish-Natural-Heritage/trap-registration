import express from 'express';
// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import ConvictionController from './controllers/conviction.js';
import GeneralController from './controllers/general.js';
import MeatbaitController from './controllers/meat-bait.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';
import PostcodeController from './controllers/postcode.js';
import AddressController from './controllers/address.js';
import ManualAddressController from './controllers/manual-address.js';
import RenewalIntroController from './controllers/renewal-intro.js';
import RenewalRegistrationController from './controllers/renewal-registration.js';
import RenewalPostcodeController from './controllers/renewal-postcode.js';
import RenewalEmailSuccessController from './controllers/renewal-email-success.js';
import renewalLoginController from './controllers/renewal-login.js';
import RenewalCheckAnswersController from './controllers/renewal-check-answers.js';
import RenewalSuccessController from './controllers/renewal-success.js';
import config from './config.js';

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

// Renewal start pages

const allowedHostPrefixes = [
  'https://uat-licensing.nature.scot',
  'https://dev-licensing.nature.scot',
  'http://localhost:3000',
  'http://localhost:3999'
];

if (allowedHostPrefixes.includes(config.hostPrefix)) {
  router.use(
    Page({
      path: 'renewal-intro',
      positiveForward: 'renewal-registration',
      controller: RenewalIntroController
    })
  );

  router.use(
    Page({
      path: 'renewal-registration',
      back: 'renewal-intro',
      positiveForward: 'renewal-postcode',
      controller: RenewalRegistrationController
    })
  );

  router.use(
    Page({
      path: 'renewal-postcode',
      back: 'renewal-registration',
      positiveForward: 'renewal-email-success',
      controller: RenewalPostcodeController
    })
  );

  router.use(
    Page({
      path: 'renewal-email-success',
      back: 'renewal-postcode',
      positiveForward: 'renewal-login',
      controller: RenewalEmailSuccessController
    })
  );

  router.use(
    Page({
      path: 'renewal-login',
      positiveForward: 'renewal-check-answers',
      controller: renewalLoginController
    })
  );

  router.use(
    Page({
      path: 'renewal-check-answers',
      back: 'renewal-login',
      positiveForward: 'renewal-success',
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
}

export {router as default};
