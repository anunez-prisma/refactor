import { POST } from '../../../../../fixtures/utils/http.json';
import { OK, CREATE_SUCCES } from '../../../../../fixtures/utils/StatusCode.json';
import { ENDPOINT_QR_ADQUIRENTE_REDBEE, 
        ENDPOINT_QR_ADQUIRENTE_DETAIL,
        ENDPOINT_PAYMENT} from '../../../../../fixtures/endpoints.json'

const bodyRedBee = require('../../../../../fixtures/forms/qrAdquirenteRedBee.json');
const commonHeader = require('../../../../../fixtures/forms/commons/commonHeader.json');


  
  When(
    'Se genera un QR Adquirente en RedBee',
    () => {
      cy.request({
        method: POST,
        url: Cypress.env('qrAdquirenteRedBeeUrl') + ENDPOINT_QR_ADQUIRENTE_REDBEE,
        headers: {
          ...commonHeader
        },
        body: bodyRedBee,
        failOnStatusCode: false
      }).as('get_qr_redbee').should((response) => {
        cy.validateStatusCode(response.status, OK);
      })
    }
  );
  
  And(
    'Se realiza el parse del QR {string}',
    (card, dataTable) => {
      let info = dataTable.hashes()[0];
      cy.get('@get_token_data').then(($token_data) => {
        cy.log(JSON.stringify($token_data.body));
        cy.log(card);
        cy.get('@get_qr_redbee').then(($qr_redbee) => {
          cy.log(JSON.stringify($qr_redbee.body));
          cy.log($token_data.body.token_type + ' ' + $token_data.body.access_token);
          cy.request({
            method: POST,
            url: Cypress.env('apigeeServerHost') + ENDPOINT_QR_ADQUIRENTE_DETAIL,
            headers: {
              ...commonHeader,
              'Cuit-Owner': info.cuit,
              'Authorization': $token_data.body.token_type + ' ' + $token_data.body.access_token
            },
            body: {
              "qr_raw": $qr_redbee.body.text
            },
            failOnStatusCode: false
          }).as('get_qr_parsed').should((response) => {
            cy.validateStatusCode(response.status, OK);
          });
        });
      });
    }
  );
  
  Then(
    'Se realiza el pago',
    (dataTable) => {
      let info = dataTable.hashes()[0];
      cy.get('@get_token_data').then(($token_data) => {
        cy.get('@get_qr_parsed').then(($get_qr_parsed) => {
          cy.log(JSON.stringify($get_qr_parsed.body));
          cy.request({
            method: POST,
            url: Cypress.env('apigeeServerHost') + ENDPOINT_PAYMENT,
            headers: {
              ...commonHeader,
              'Cuit-Owner': info.cuit,
              'Authorization': $token_data.body.token_type + ' ' + $token_data.body.access_token,
              'apikey': info.apikey
            },
            body: {
              'qr_id': $get_qr_parsed.body.qr_id,
              'establishment_id': $get_qr_parsed.body.establishment_data.establishment_transactions_details[1].establishment_id,
              'transaction_datetime': $get_qr_parsed.body.transaction_datetime,
              'payment_method_information': {
                'scheme': info.scheme,
                'type': info.type
              },
              'card_information': {
                'card_number': info.card_number,
                'card_expiration': info.card_expiration,
                'security_code': info.security_code
              },
              'bank_information': {
                'bank_id': info.bank_id,
                'description': info.bank_description
              },
              'amount': $get_qr_parsed.body.amount,
              'currency': info.currency,
              'installments': $get_qr_parsed.body.installments,
              'terminal_data': {
                'trace_number': $get_qr_parsed.body.establishment_data.establishment_transactions_details[1].trace_number,
                'ticket_number': $get_qr_parsed.body.establishment_data.establishment_transactions_details[1].ticket_number,
                'terminal_number': $get_qr_parsed.body.establishment_data.terminal_number
              }
            },
            failOnStatusCode: false
          }).as('get_payment_result').should((response) => {
            cy.validateStatusCode(response.status, CREATE_SUCCES);
          });
        });
      });
    }
  );
  
  And(
    'Se validan los datos del pago',
    (dataTable) => {
      let info = dataTable.hashes()[0];
      cy.get('@get_payment_result').then(($get_payment_result) => {
        cy.log(JSON.stringify($get_payment_result.body));
        switch (info.escenario) {
          case "WS_OK":
            validateScenarioOK($get_payment_result.body)
            break;
          default:
            break;
        }
      });
    }
  );
  
  function validateScenarioOK(payment){
    cy.existProperty(payment, 'qr_id')
    cy.isNotNull(payment.qr_id)
    cy.existProperty(payment, 'payment_id')
    cy.isNotNull(payment.payment_id)
    cy.typeof(payment.payment_id, 'number');
    cy.existProperty(payment, 'transaction_datetime')
    cy.isNotNull(payment.transaction_datetime)
    cy.existProperty(payment, 'status_details')
    cy.isNotNull(payment.status_details)
    cy.isNotEmpty(payment.status_details);
    cy.existProperty(payment.status_details, 'status')
    cy.isNotNull(payment.status_details.status)
    cy.existProperty(payment.status_details, 'card_authorization_code')
    cy.isNotNull(payment.status_details.card_authorization_code)
    cy.existProperty(payment.status_details, 'card_reference_number')
    cy.isNotNull(payment.status_details.card_reference_number)
    cy.existProperty(payment.status_details, 'description')
    cy.isNotNull(payment.status_details.description)
    cy.existProperty(payment.status_details, 'ticket_footer')
    cy.isNotNull(payment.status_details.ticket_footer)
    cy.existProperty(payment.status_details, 'status_code')
    cy.isNotNull(payment.status_details.status_code);
  }