describe('template spec', () => {
  const baseUrl = Cypress.env('baseUrl');
  const version = Cypress.env('version');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.visit(baseUrl + '/');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();

    cy.get('p').contains("Welcome to MSP's Teleplan Web Access");
    cy.get('img[src="images/t_contents.gif"]');

    // ($=ends in, *=substr)
    cy.get('a[href$="JteleplanHome"]').contains('Home');
    cy.get('a[href$="JsubmitClaim"]').contains('Send Claims');
    cy.get('a[href$="JretrieveRemit"]').contains('Retrieve Remittances');
    cy.get('a[href$="JotherProcess"]').contains('Other Processing + Logs');
    cy.get('a[href$="JcheckEligibility"]').contains('Check Eligibility');
    cy.get('a[href$="JchangePassword"]').contains('Change Password');
    cy.get('a[href$="Jadmin"]').contains('Admin Functions');
    cy.get('a[href$="Jhelp"]').contains('Help');
    cy.get('a[href$="WsignOff"]').contains('Sign off');

    cy.get('a[href$="#top"]').contains('Top');
    cy.get('a[href$="Jcopyright"]').contains('Copyright');
    cy.get('a[href$="Jdisclaimer"]').contains('Disclaimer');
    cy.get('a[href$="privacy.html"]').contains('Privacy');
    cy.get('a[target$="_blank"]').contains('Contact us');
  });

  afterEach(() => {
    cy.contains("Sign off").click();
    // Wait for login page to display again
    cy.get('input[name="username"]');
  });

  it('displays the correct Home page', () => {
    cy.contains(`Version: Teleplan Web ${version}`);

  });

  it('displays the correct Send Claims page', () => {
    cy.get('a[href$="JsubmitClaim"]').click();

    cy.get('p').contains("Send Claims");
    cy.get('input[type="file"]');

    cy.get('input[type="submit"]')
      .should('have.prop', 'value')
      .should('equal', 'Send file ');

    cy.get('input[type="reset"]')
      .should('have.prop', 'value')
      .should('equal', 'Clear');

    cy.get('a[href*="WgetLog"]');
  });

  it('displays the correct Retrieve Remittances page', () => {
    cy.get('a[href$="JretrieveRemit"]').click();

    cy.get('p').contains("Retrieve Remittances/Refusals/Messages");
    cy.get('td').contains("Select information to retrieve");

    cy.get('input[type="radio"]')
      .first()
      .should('have.prop', 'checked')
      .should('be.true');

    cy.get('input[type="radio"]')
      .last()
      .should('have.prop', 'checked')
      .should('be.false');

    cy.get('input[type="submit"]')
      .should('have.prop', 'value')
      .should('equal', 'Retrieve');

    cy.get('a[href*="WgetLog"]');

  });

  it('displays the correct Other Processing page', () => {
    cy.get('a[href$="JotherProcess"]').click();

    cy.get('p').contains("Other Processing");
    cy.get('p').contains("Select a support request type");

    cy.get('a[href$="JretrieveData"]');
    cy.get('a[href$="JsendData"]');
    cy.get('a[href$="Jlogs"]');
  });

  it('displays the correct Check Eligibility page', () => {
    cy.get('a[href$="JcheckEligibility"]').click();

    cy.get('p').contains("MSP Coverage Status Check");

    cy.get('td').contains("*Personal Health Number");
    cy.get('input[name="PHN"]');

    cy.get('td').contains("*Birth Date");
    cy.get('input[name="dateOfBirthyyyy"]');
    cy.get('input[name="dateOfBirthmm"]');
    cy.get('input[name="dateOfBirthdd"]');

    cy.get('td').contains("*Date of Service");
    cy.get('input[name="dateOfServiceyyyy"]');
    cy.get('input[name="dateOfServicemm"]');
    cy.get('input[name="dateOfServicedd"]');

    cy.get('td').contains("Patient Status Request");


    cy.get('input[name="PatientVisitCharge"]')
      .should('have.attr', 'type', 'CHECKBOX');

    cy.get('input[name="LastEyeExam"]')
      .should('have.attr', 'type', 'CHECKBOX');

    cy.get('input[name="PatientRestriction"]')
      .should('have.attr', 'type', 'CHECKBOX');

    cy.get('input[type="submit"]')
      .should('have.prop', 'value')
      .should('equal', 'Submit');
  });

  it('displays the correct Change Password page', () => {
    cy.get('a[href$="JchangePassword"]').click();

    cy.get('p').contains("Change Password");

    cy.get('td').contains("Old Password");
    cy.get('input[name="password"]')
      .should('have.attr', 'type', 'PASSWORD');

    cy.get('td').contains("New Password");
    cy.get('input[name="new.password"]')
      .should('have.attr', 'type', 'PASSWORD');

    cy.get('td').contains("Confirm New Password");
    cy.get('input[name="confirm.password"]')
      .should('have.attr', 'type', 'PASSWORD');

    cy.get('input[type="submit"]')
      .should('have.prop', 'value')
      .should('equal', 'Change Password');

    cy.get('input[type="reset"]')
      .should('have.prop', 'value')
      .should('equal', 'Start Over');
  });

  it('displays the correct Admin Functions page', () => {
    cy.get('a[href$="Jadmin"]').click();

    cy.get('p').contains("Administrator Functions");
    cy.get('a[href$="Jadminlogs"]').contains('Display User logs');
    cy.get('a[href$="Jadminwhatsnewmgmt"]').contains("What's New Bulletin Management");
    cy.get('a[href$="JldapTransfer"]').contains('External LDAP Management System');
  });

});
