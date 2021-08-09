Given('As a user I want to execute Pokemon GET api for Pokemon {string}', (pokename) => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokename,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode:false
    }).as('get_pokemon_data')

    //here 'get_pokemon_data'is alias for this request to be used by other steps

 });

Then('Verify response status code is {int}', (statusCode) => {
    cy.get('@get_pokemon_data').should((response)=> {
      expect(response.status).to.eq(statusCode);
    })

    cy.reportLog("Verificando respuesta del servicio");
 });

 Then('Verify response details for Pokemon {string}', (pokename) => {
    cy.get('@get_pokemon_data').should((response)=> {

      expect(response.body).to.have.property('abilities');
      //Different ways of validating nested properties
      //1st Way
      expect(response.body).to.have.nested.property('forms[0].name',pokename);
      //2nd Way
      expect(response.body.forms[0]).to.have.property('name',pokename);
      //3rd Way
      const name = response.body.forms[0].name;
      assert.equal(name, pokename);

      expect(response).to.have.property('headers');
    })
 });