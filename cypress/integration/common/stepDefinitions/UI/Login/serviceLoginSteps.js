import LoginPage from '../../../../pages/LoginPage/LoginPage';

const loginPage = new LoginPage();

let prep;
before(() => {
    cy.log("--------- Inicio Consulta de SQL ---------");
    cy.sqlServer(Cypress.env('query')).then(result => {
        prep = result;
    });
});

Given(
  'Yo abro la pagina de login de Prisma',
  () => {
    cy.visit(Cypress.env('prismaUrl'),{timeout: 80000});
  }
);


Then(
  'Realizo login con los datos de la base de datos de qa',
  () => {
    loginPage.typeInEmailTxtBox(prep[0]);
    loginPage.typeInPasswordTxtBox("password");
    cy.wait(10000);
  }
);