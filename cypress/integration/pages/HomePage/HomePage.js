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
    cy.validateCurrency(elements.HOMEPAGE.SALDO_DISPONIBLE, balace);
  }

  validateRevisionBalance(revisionBalance){
    cy.validateCurrency(elements.HOMEPAGE.SALDO_EN_REVISION, revisionBalance);
  }

  validateBalanceToBeAvailable(balanceToBeAvailable){
    cy.validateCurrency(elements.HOMEPAGE.SALDO_A_DISPONIBILIZAR, balanceToBeAvailable.toFixed(2));
  }

  validateBalanceModule(){
    cy.existElement(elements.HOMEPAGE.ENVIAR_DINERO_BUTTOM);
    cy.existElement(elements.HOMEPAGE.ENVIAR_DINERO_LABEL);
    cy.existElement(elements.HOMEPAGE.RETIRAR_DINERO_BUTTOM);
    cy.existElement(elements.HOMEPAGE.RETIRAR_DINERO_LABEL);
    cy.existElement(elements.HOMEPAGE.SALDO_A_DISPONIBILIZAR);
    cy.existElement(elements.HOMEPAGE.SALDO_A_DISPONIBILIZAR_LABEL);
    cy.existElement(elements.HOMEPAGE.SALDO_DISPONIBLE);
    cy.existElement(elements.HOMEPAGE.SALDO_DISPONIBLE_LABEL);
    cy.existElement(elements.HOMEPAGE.SALDO_EN_REVISION);
    cy.existElement(elements.HOMEPAGE.SALDO_EN_REVISION_LABEL);
  }

  validateMovementsContainer(){
    cy.validateLengthContainer(elements.HOMEPAGE.MOVEMENT_CONTAINER, 25);
  }

  validateEmptyMovementsContainer(){
    cy.existElement(elements.HOMEPAGE.EMPTY_MOVEMENTS_CONTAINER)
  }
}
export default HomePage;