import './helpers/polyfill';
import FHIR from 'fhirclient';
require('fetch-everywhere');

fetch(process.env.PUBLIC_URL + '/launch-context.json')
  .then(function (response) {
    return response.json()
  }).then(function (launchContext) {
    return FHIR.oauth2.authorize(launchContext);
  })
  .catch(function (error) {
    console.log('bad error: ', error)
  }
  )