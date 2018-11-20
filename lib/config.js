/*
 * Create and export configuration variables
 *
 */

 // Container of all the environments
 var environments = {};

 // Staging (default) environment
 environments.staging = {
   'httpPort': 3000,
   'httpsPort': 3001,
   'envName': 'staging',
   'hashingSecret': 'thisIsASecret',
   'maxChecks': 5,
   'twilio' : {
     'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
     'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
     'fromPhone': '+15005550006'
   },
   'stripe': {
     'secretApiKeyTest':'stripekey',
     'public_key': 'pk_test_201bMIAMqljxgsLehXgshj5J'
   },
   'mailgun': {
     'ApiKeyTest':'mailgunKey',
     'boundary': '------------------------69b2c2b9c464731d',
     'domain':'sandbox0630029a67f24517a9c3e383d2c6098e.mailgun.org'
   },
   'templateGlobals':{
     'appName': 'FreePizzaDelivery',
     'companyName' : 'ToBeCreated, SA',
     'yearCreated': '2018',
     'baseUrl': 'http://localhost:3000/'
   }
 };

 // Production environments
 environments.production = {
   'httpPort': 5000,
   'httpsPort': 5001,
   'envName': 'production',
   'hashingSecret': 'thisIsAlsoASecret',
   'maxChecks': 5,
   'twilio' : {
     'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
     'authToken': '9455e3eb3109edc12e3d8c92768f7a67',
     'fromPhone': '+15005550006'
   },
   'stripe': {
     'secretApiKeyTest':'stripekey'
   },
   'mailgun': {
     'ApiKeyTest':'mailgunkey',
     'boundary': '------------------------69b2c2b9c464731d',
     'domain':'sandbox0630029a67f24517a9c3e383d2c6098e.mailgun.org'
   },
   'templateGlobals':{
     'appName': 'FreePizzaDelivery',
     'companyName' : 'ToBeCreated, SA',
     'yearCreated': '2018',
     'baseUrl': 'http://localhost:3000/'
   }
 };

 // Determine which environment was passed as a command-line argument
 var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

 // Check that the current environment is one of the environments above, if not, default to staging
 var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

 // Export the module
 module.exports = environmentToExport;
