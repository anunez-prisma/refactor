import HomePage from '../../../pages/HomePage/HomePage.js';
import ResultPage from '../../../pages/ResultPage/ResultPage.js';

const homePage = new HomePage();
const resultPage = new ResultPage();

//glue code for steps
Given('I open the google web url', () => {
    cy.visit(Cypress.env('baseUrl')); // Para el uso de archivos de config se reemplaza la URL por '/' cy.visit('https://www.google.com');
});

Then( 'I verify title of the web page as {string}', (title) => {
    cy.title().should('include', title);
});

Given('I open the Google web url', () => {
    cy.visit(Cypress.env('baseUrl'));

  });

Then(
    'I verify title of web page as {string}',
    (title) => {
        cy.title().should('include', title);
    }
  );

When(
    'I provide search query as {string}',
    (query) => {
      homePage.clickSearchTxtBox();
      homePage.typeInSearchTxtBox(query);
      homePage.submitSearchQuery();
    }
  );

Then(
    'Verify first search result to match {string} keyword',
    (search_keyword) => {
      let result = resultPage.verifyFirstResult(search_keyword);
    }
  );