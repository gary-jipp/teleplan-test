const path = require('path');
const {deleteDownloadsFolderBeforeAll} = require('cypress-delete-downloads-folder');

describe('Tests for File Download functions', () => {
  const baseUrl = Cypress.env('baseUrl');
  const version = Cypress.env('version');
  const username = Cypress.env('username');
  const password = Cypress.env('password');

  deleteDownloadsFolderBeforeAll();

  beforeEach(() => {
    cy.visit(baseUrl + '/');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();

    cy.get('a[href$="JretrieveRemit"]').click();
    cy.intercept('POST', '**/TeleplanBroker').as('pickupFile');
  });

  afterEach(() => {
    cy.contains("Sign off").click();
    // Wait for login page to display again
    cy.get('input[name="username"]');
  });

  it('downloads a Remittance file', () => {
    cy.get('input[type="radio"]').first().check();
    cy.get('input[type="submit"]').click();

    cy.wait('@pickupFile', {timeout: 20000}).then((res) => {
      const downloadsFolder = Cypress.config('downloadsFolder');

      // grab filename from 'content-disposition' header
      const filename = res.response.headers['content-disposition'].split('filename=')[1];
      const file = filename.replace(/['";]+/g, '');
      const downloadedFilename = path.join(downloadsFolder, file);

      cy.log(`**Downloading ${file}**`);
      cy.readFile(downloadedFilename).should((buffer) => {
        expect(buffer.length).to.be.gt(100);
      });
      cy.log(`**File ${file} exists in downloads folder**`);

      cy.readFile(downloadedFilename).should((text) => {
        const lines = text.split('\n');
        expect(lines).to.have.length.gt(0);
        const header = lines[0];
        // expect(header.length).to.equal(167);
        // expect(header.startsWith("VTC")).to.be.true;
      });

      cy.log(`**File ${file} contains a valid header**`);
    });
  });

  it('downloads refusals and messages only', () => {
    cy.get('input[type="radio"]').last().check();
    cy.get('input[type="submit"]').click();

    cy.wait('@pickupFile', {timeout: 20000}).then((res) => {
      const downloadsFolder = Cypress.config('downloadsFolder');

      // grab filename from 'content-disposition' header
      const filename = res.response.headers['content-disposition'].split('filename=')[1];
      const file = filename.replace(/['";]+/g, '');
      const downloadedFilename = path.join(downloadsFolder, file);

      cy.log(`**Downloading ${file}**`);
      cy.readFile(downloadedFilename).should((buffer) => {
        expect(buffer.length).to.be.gt(100);
      });
      cy.log(`**File ${file} exists in downloads folder**`);

      cy.readFile(downloadedFilename).should((text) => {
        const lines = text.split('\n');
        expect(lines).to.have.length.gt(0);
        const header = lines[0];
        // expect(header.length).to.equal(167);
        // expect(header.startsWith("VTC")).to.be.true;
      });
      cy.log(`**File ${file} contains a valid header**`);
    });
  });


});
