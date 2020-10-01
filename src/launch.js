import FHIR from 'fhirclient';
import axios from 'axios';
import './helpers/polyfill';
require('fetch-everywhere');

fetch(process.env.PUBLIC_URL + '/launch-context.json')
  .then(function (response) {
    return response.data
  }).then(function (launchContext) {
    // const context = JSON.stringify(launchContext);
    // console.log('launchContext: ', launchContext);
    return FHIR.oauth2.authorize(launchContext);
  })
  .catch(function (error) {
    console.log('bad error: ', error)
  }
  )
