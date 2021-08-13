//ResultPage.js
var elements = require('./elements')
class ResultPage {

    verifyFirstResult(search_keyword) {
        //matches partial text of result string
        return cy.contains('body', search_keyword);
      }

  }
  export default ResultPage;