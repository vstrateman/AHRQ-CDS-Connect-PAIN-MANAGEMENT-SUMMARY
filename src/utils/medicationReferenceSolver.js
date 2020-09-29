import FHIR from "fhirclient";

export default function medicationReferenceSolver(referenceURL) {
    return Promise.all([getMedicationCode(referenceURL)])
}

async function getMedicationCode(orgReferenceURL) {
        let request = orgReferenceURL;
        if ((orgReferenceURL.indexOf('http') > -1) && (orgReferenceURL.indexOf('Medication/') > -1)) {
            request = orgReferenceURL.substring(orgReferenceURL.indexOf('Medication/'));
        }
       return FHIR.oauth2.ready()
            .then(client => client.request(request))
            .then(function (response) {
                return response.code;
            });
}