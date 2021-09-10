// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import sqlServer from 'cypress-sql-server';
import keywords from './keywords';
const addContext = require('mochawesome/addContext');
require('@reportportal/agent-js-cypress/lib/commands/reportPortalCommands');

sqlServer.loadDBCommands();
keywords.loadKeyWords();

Cypress.Commands.add('text', { prevSubject: true }, (subject, options) => { return subject.text();
});

//Esto permite interactuar con iFrames en caso de existir alguno.
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});
//Ejemplo de utilizacion del codigo anterior
//En caso de encontrar en una Web: for <iframe id="foo" src="bar.html"></iframe>
//cy.get('#foo').iframe().find('.checkbox_0.0').click({ force: true });

//Following command logs only subject in Report file
Cypress.Commands.add("reportLog", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context))
});

//Following command logs only Context,Value as KEY-VALUE in Report file
Cypress.Commands.add("reportLogKV", (context, value) => {
  cy.once("test:after:run", (test) => addContext({ test }, {
    title: context,
    value: value
  }))
});