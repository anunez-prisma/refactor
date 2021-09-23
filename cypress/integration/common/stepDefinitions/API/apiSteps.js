import { OK } from '../../../../fixtures/utils/StatusCode.json';
import { GET } from '../../../../fixtures/utils/http.json';
const commonHeader = require('../../../../fixtures/forms/commons/commonHeader.json');

const ENDPOINT = Cypress.env('endpoint');

And(
  'La generación del token de ApiGee',
    (dataTable) => {
      let info = dataTable.hashes()[0];
      cy.request({
        method: GET,
        url: Cypress.env('apigeeServerHost') + ENDPOINT.access_token + info.grant_type,
        headers: {
          ...commonHeader,
          'Authorization': info.basic_auth
        },
        failOnStatusCode: false
      }).as('get_token_data').then((response) => {
        cy.validateStatusCode(response.status, OK);
      })
  }
);