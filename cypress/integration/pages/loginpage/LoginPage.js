var elements = require('./elements');

class LoginPage{

    typeInEmailTxtBox(value) {
        cy.sendKeys(elements.LOGINPAGE.EMAIL, value);
    }

    typeInPasswordTxtBox(value) {
        cy.sendKeys(elements.LOGINPAGE.PASSWORD, value);
    }

    clickOnLoginBtn(){
        cy.clickButton(elements.LOGINPAGE.LOGIN_BUTTON);
    }

    validatePageLogin(){
        cy.contains(elements.LOGINPAGE.EMAIL_LABEL);
        cy.contains(elements.LOGINPAGE.PASSWORD_LABEL);
        cy.contains(elements.LOGINPAGE.LOGIN_BUTTON_LABEL);
    }
}

export default LoginPage;