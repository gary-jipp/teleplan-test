# Teleplan Automated Tests
These tests are Cypress-based and can be included in a CI/CD build pipeline.

To run these tests:
- You need `node.js`.  Nothing else.
- copy `cypress.env.json.example` to `cypress.env.json`
- edit `cypress.env.json` with the desired test environment
- Make sure you have correct data or tests will fail
- Note: `cypress.env.json` is not saved in git and its entries can be overridden by the OS environment

### Run on Computer as container (Linux or Windows WSL2)
- docker or podman must be installed
- `test.sh` (first run will download cypress image)

### Run on Computer with NPM (Linux or Windows WSL2)
- node.js must be installed on system
- install & run the tests
```
npm install
npm test
or
npm run cypress  # for GUI interactive
```
To open the Cypress GUI to view/edit/run tests interactively
```
npm run cypress
```

### Test Config `cypress.env.json`
```
{
  "version": "4.2.8",
  "baseUrl": "https://tlpt2.moh.hnet.bc.ca",
  "password": "password",
  "username": "username",
  "username-bad": "bad-username",
  "phn-invalid": "1234567890",
  "phn-notfound": "9347984074",
  "phn-found": "add valid test phn here",
  "phn-dob-year": "1977",
  "phn-dob-month": "02",
  "phn-dob-day": "01",
  "startSeq": 1202
}
```
#### `baseUrl:` Teleplan main url for environment being tested
#### `username:` Valid Teleplan User username for environment
#### `password:` Valid  Teleplan User password for environment
#### `username-bad:` InValid Teleplan User username
#### `phn-invalid:` Invalid PHN (bad format)
#### `phn-notfound:` Valid PHN format, but does not exist
#### `phn-found:` Valid PHN that exists
#### `phn-dob-year:` Date of Birth year for valid phn
#### `phn-dob-month:` Date of Birth month for valid phn
#### `phn-dob-day:` Can always be "01" for e45 checks