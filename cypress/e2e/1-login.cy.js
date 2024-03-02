describe('template spec', () => {
  const baseUrl = Cypress.env('baseUrl');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.visit(baseUrl + "/");
  });


  it('displays the correct login page', () => {
    cy.get('img[src="images/mspteleplan.gif"]');

    cy.get("p")
      .contains("Welcome to the Ministry of Health's Teleplan Web Access");

    cy.get('input[name="username"]')
      .should('have.prop', 'value')
      .should('be.empty');

    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'PASSWORD')
      .and('have.prop', 'value')
      .should('be.empty');

    cy.get('input[name="password"]')


      .should('have.prop', 'value')
      .should('be.empty');

    cy.get('input[type="submit"]')
      .should('have.prop', 'value')
      .should('equal', 'Login');

    cy.get('input[type="reset"]')
      .should('have.prop', 'value')
      .should('equal', 'Clear');
  });


  it('can reset username & password after typing', () => {
    cy.get('input[name="username"]')
      .type(username, {delay: 150});

    cy.get('input[name="password"]')
      .type(password, {delay: 150});

    cy.get('input[type="reset"]')
      .click();

    // Fields should be reset to empty
    cy.get('input[name="password"]')
      .should('have.prop', 'value')
      .should('be.empty');

    cy.get('input[name="username"]')
      .should('have.prop', 'value')
      .should('be.empty');
  });

  it('login fails with invalid username & password', () => {
    const username = Cypress.env('username-bad');

    cy.get('input[name="username"]')
      .type(username, {delay: 150});

    cy.get('input[name="password"]')
      .type(password, {delay: 150});

    cy.get('input[type="submit"]')
      .click();

    // Should display a <select> with 1 <option>
    cy.get("option")
      .contains("LDAP logon failure: user is not authorized");
  });


  it('can login with valid username & password', () => {
    cy.get('input[name="username"]')
      .type(username, {delay: 150});

    cy.get('input[name="password"]')
      .type(password, {delay: 150});

    cy.get('input[type="submit"]')
      .click();

    cy.contains("Sign off")
      .click();
  });



});
