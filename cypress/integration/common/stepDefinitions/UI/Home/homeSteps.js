import HomePage from '../../../../pages/HomePage/HomePage';
import UserDao from '../../../../dao/user/userDao';

const TypeUser = require("../../../../../fixtures/utils/typeUser.json");
const userDao = new UserDao();
const homePage = new HomePage();

Given(
    'Un usuario {string}, con saldo disponible {string} y saldo en revision {string}',
    (userType, isAvailableBalance, isBalanceReview) => {
        cy.isNotNull(userType);
        userDao.getDataUserByTypeUser(userType, isAvailableBalance, isBalanceReview);
    }
);

Then(
    'Puedo loguearme a la cuenta',
    () => {
      cy.get('@dataDenomination').then(($dataDenomination) => {
        homePage.closeOptionalNewPortalPublicity();
        cy.wait(4000);
        homePage.validateTextHeader($dataDenomination[0] + ' ' + $dataDenomination[1]);
      });
    }
  );

And(
    'hay saldo disponible',
    () => {
        cy.get('@dataUser').then(($dataUser) => {
            homePage.validateAvailableBalance($dataUser[4]);
        });
    }
);

And(
    'hay saldo en revision',
    () => {
        cy.get('@dataUser').then(($dataUser) => {
            homePage.validateRevisionBalance($dataUser[3]);
        });
    }
);
  
Then(
    'se calcula y valida saldo a disponibilizar',
    () => {
        cy.get('@dataUser').then(($dataUser) => {
            homePage.validateBalanceToBeAvailable($dataUser[2] - $dataUser[3] - $dataUser[4]);
        });
    }
);

Then(
    'La seccion Saldos se visualiza correctamente',
    () => {
        homePage.validateBalanceModule();
    }
);

Given(
    'Un usuario {string} transacciones',
    (isWithTransactions) => {
        userDao.getDataUserWithTransactios(isWithTransactions);
    }
);

Then(
    'Se visualiza el titulo que se lee {string}',
    (label) => {
        cy.containsLabel(label)
    }
);

Then(
    'Se ven las primeras 25 transacciones o menos',
    () => {
        homePage.validateMovementsContainer();
    }
);

And(
    'Se visualiza link que se lee {string} con una flecha que apunta a la derecha',
    (arrowButtomLabel) => {
        cy.containsLabel(arrowButtomLabel)
    }
);

Then(
    'Se visualiza la seccion Últimos movimientos vacia',
    () => {
        homePage.validateEmptyMovementsContainer();
    }
);