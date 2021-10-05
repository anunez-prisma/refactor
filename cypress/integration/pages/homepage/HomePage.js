var elements = require('./elements')
class HomePage {

  validateTextHeader(header){
    cy.contains(header);
  }

  clickOnMenuSession(){
    cy.clickButtonXpath(elements.HOMEPAGE.SESSION_MENU);
  }

  clickOnLogoutBtn(){
    cy.clickButtonXpath(elements.HOMEPAGE.LOGOUT_BUTTON);
  }

  closeOptionalNewPortalPublicity(){
    cy.closePublicity(elements.HOMEPAGE.NEW_PORTAL_PUBLIBITY);
  }

  validateAvailableBalance(balace){
    cy.validateCurrency(elements.HOMEPAGE.AVAILABLE_BALANCE, balace);
  }

  validateRevisionBalance(revisionBalance){
    cy.validateCurrency(elements.HOMEPAGE.BALANCE_IN_REVISION, revisionBalance);
  }

  validateBalanceToBeAvailable(balanceToBeAvailable){
    cy.validateCurrency(elements.HOMEPAGE.BALANCE_TO_BE_AVAILABLE, balanceToBeAvailable.toFixed(2));
  }

  validateBalanceModule(){
    cy.existElement(elements.HOMEPAGE.SET_MONEY_BUTTOM);
    cy.existElement(elements.HOMEPAGE.SET_MONEY_LABEL);
    cy.existElement(elements.HOMEPAGE.GET_MONEY_BUTTOM);
    cy.existElement(elements.HOMEPAGE.GET_MONEY_LABEL);
    cy.existElement(elements.HOMEPAGE.BALANCE_TO_BE_AVAILABLE);
    cy.existElement(elements.HOMEPAGE.BALANCE_TO_BE_AVAILABLE_LABEL);
    cy.existElement(elements.HOMEPAGE.AVAILABLE_BALANCE);
    cy.existElement(elements.HOMEPAGE.AVAILABLE_BALANCE_LABEL);
    cy.existElement(elements.HOMEPAGE.BALANCE_IN_REVISION);
    cy.existElement(elements.HOMEPAGE.BALANCE_IN_REVISION_LABEL);
  }

  validateMovementsContainer(){
    cy.validateLengthContainer(elements.HOMEPAGE.MOVEMENT_CONTAINER, 25);
  }

  validateEmptyMovementsContainer(){
    cy.existElement(elements.HOMEPAGE.EMPTY_MOVEMENTS_CONTAINER)
  }
}
export default HomePage;