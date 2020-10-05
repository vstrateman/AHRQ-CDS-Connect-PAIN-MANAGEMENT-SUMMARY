import FHIR from 'fhirclient';
// import { oauth2 as SMART } from 'fhirclient';
import './helpers/polyfill';
require('fetch-everywhere');

fetch(process.env.PUBLIC_URL + '/launch-context.json')
  .then(function (response) {
    return response.json()
  }).then(function (launchContext) {
    // const context = JSON.stringify(launchContext);
    // console.log('launchContext: ', launchContext);
    return FHIR.oauth2.authorize(launchContext);
  })
  .catch(function (error) {
    console.log('bad error: ', error)
  }
  )
// SMART.init({
//   iss: "https://launcher-develop.sandbox.alphora.com/v/r4/fhir",
//   clientId: "6c12dff4-24e7-4475-a742-b08972c4ea27",
//   scope: "patient/*.read launch launch/patient",
//   completeInTarget: true
// }).then(client => {
//   console.log('client:', client)
//   return Promise.all([
//     client.patient.read(),
//     client.request(`/MedicationRequest?patient=${client.patient.id}`, {
//       resolveReferences: "medicationReference",
//       pageLimit: 0,
//       flat: true
//     }).then(response => {
//       console.log('med response: ', response);
//     })
//   ])
// })