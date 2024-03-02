describe('Tests for Eligibility functions', () => {
  const baseUrl = Cypress.env('baseUrl');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.visit(baseUrl + '/');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();

    cy.get('a[href$="JcheckEligibility"]').click();
    cy.intercept('POST', '**/TeleplanBroker').as('eligibitityService');
  });

  afterEach(() => {
    cy.contains("Sign off").click();
    // Wait for login page to display again
    cy.get('input[name="username"]');
  });

  it('shows field cannot be blank if Empty PHN', () => {
    cy.get('input[type="submit"]').click();

    cy.wait('@eligibitityService');

    cy.get('select[name="errors"] option')
      .contains('Field cannot be blank:PERSONAL HEALTH NUMBER');
  });

  it('shows error if Invalid PHN', () => {
    const phn = Cypress.env('phn-invalid');

    cy.get('input[name="PHN"]').type(phn);

    cy.get('input[type="submit"]').click();

    cy.wait('@eligibitityService');

    cy.get('select[name="errors"] option')
      .contains('Invalid: PERSONAL HEALTH NUMBER');
  });

  it('shows error with missing Date of Birth', () => {
    const phn = Cypress.env('phn-notfound');

    cy.get('input[name="PHN"]').type(phn);

    cy.get('input[type="submit"]')
      .click();

    cy.wait('@eligibitityService');

    cy.get('select[name="errors"] option')
      .contains('Invalid: DATE OF BIRTH: INCOMPLETE');
  });

  it('shows INVALID MONTH  with invalid Date of Birth ', () => {
    const phn = Cypress.env('phn-notfound');
    const year = Cypress.env('phn-dob-year');
    const day = Cypress.env('phn-dob-day');

    cy.get('input[name="PHN"]').type(phn);
    cy.get('input[name="dateOfBirthyyyy"]').type(year);
    cy.get('input[name="dateOfBirthmm"]').type("19");
    cy.get('input[name="dateOfBirthdd"]').type(day);

    cy.get('input[type="submit"]')
      .click();

    cy.wait('@eligibitityService');

    cy.get('select[name="errors"] option')
      .contains('Invalid: DATE OF BIRTH: INVALID MONTH');
  });

  it('returns Not Found for unknown PHN', () => {
    const phn = Cypress.env('phn-notfound');
    const year = Cypress.env('phn-dob-year');
    const month = Cypress.env('phn-dob-month');
    const day = Cypress.env('phn-dob-day');

    cy.get('input[name="PHN"]').type(phn);
    cy.get('input[name="dateOfBirthyyyy"]').type(year);
    cy.get('input[name="dateOfBirthmm"]').type(month);
    cy.get('input[name="dateOfBirthdd"]').type(day);

    cy.get('input[type="submit"]').click();

    cy.wait('@eligibitityService');

    cy.get('select[name="errors"] option')
      .contains('ELIG0010 PERSON PHN DOES NOT EXIST');

    cy.get('td p').contains(phn);
  });



});
