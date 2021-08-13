import LoginPage from '../../../../pages/LoginPage/LoginPage';

const loginPage = new LoginPage();

Given(
  'Yo abro la pagina de login de Prisma',
  () => {
    cy.visit(Cypress.env('prismaUrl'),{timeout: 80000});
  }
);


Then(
  'Realizo login con el email {string} y el password {string}',
  (user, password) => {
    cy.wait(10000);
    loginPage.typeInEmailTxtBox(user);
    loginPage.typeInPasswordTxtBox(password);
    cy.wait(10000);
  }
);