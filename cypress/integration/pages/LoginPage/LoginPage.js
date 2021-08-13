var elements = require('./elements')

class LoginPage{
    typeInEmailTxtBox(value) {
        return cy.get(elements.LOGINPAGE.EMAIL).type(value);
    }

    typeInPasswordTxtBox(value) {
        return cy.get(elements.LOGINPAGE.PASSWORD).type(value);
    }
}

export default LoginPage;