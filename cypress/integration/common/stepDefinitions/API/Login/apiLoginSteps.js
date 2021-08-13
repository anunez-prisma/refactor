Given(
    'Api login se encuentra activo',
    () => {
      //TODO validar status
    }
  );
  
  
  Then(
    'valido el servicio con el usuario {string} password {string} y channel {int}',
    (user, password, channel) => {
        cy.request({
            'method': "POST", 
            'url': Cypress.env('urlApiLogin'),
            'body': {
                username: user,
                password: password,
                channel: channel,
                grant_type: "password", 
                scope: "openid"
            },
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Basic YWNtZTphY21lc2VjcmV0'
            },
            'failOnStatusCode': false
        }).then(function(resp){
            expect(resp).is.not.null
            expect(resp).is.not.empty
            expect('#access_token').is.not.null
            expect('#access_token').to.be.a('string')
            cy.wait(10000);
        });
    }
  );