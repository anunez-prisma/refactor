import LoginPage from '../../../../pages/LoginPage/LoginPage';
import HomePage from '../../../../pages/HomePage/HomePage';
import UserDao from '../../../../dao/user/userDao';

const loginPage = new LoginPage();
const headerPage = new HomePage();
const userDao = new UserDao();

Given(
  'Ingreso al portal Todo Pago',
  () => {
    cy.visit(Cypress.env('prismaUrl'),{timeout: 80000});
  }
);

And(
  'El usuario se loguea al nuevo portal con la contraseña {string}',
  (password) => {
    cy.get('@dataUser').then(($dataUser) => {
      debugger
      loginPage.typeInEmailTxtBox($dataUser[0]);
      loginPage.typeInPasswordTxtBox(password);
      loginPage.clickOnLoginBtn();
      cy.wait(5000);
      userDao.getDenominationByEmail($dataUser[0]);
    });
  }
);

When(
  'Selecciono una cuenta de tipo {string}',
  (tipoCuenta) => {
    userDao.getDataUser(tipoCuenta);
  }
);

When(
  'El usuario hace click sobre el modal de Logout',
  () => {
    headerPage.closeOptionalNewPortalPublicity();
    headerPage.clickOnMenuSession();
    headerPage.clickOnLogoutBtn();
  }
);

Then(
  'Se genera el logout y se redirecciona al usuario a la pantalla de login',
  () => {
      loginPage.validatePageLogin();
  }
);