# ReactJS CI/CD app

  * Define global variables in src/setupTests.js - Global variables like localstorage, testing components goes here

  * Define threshold values, coverage reports, jest configuration in package.json file by adding jest block

      "jest": {
          "collectCoverageFrom": [
            "src/**/*.{js,jsx}",
            "!<rootDir>/node_modules/"
          ],
          "coverageThreshold": {
            "global": {
              "branches": 90,
              "functions": 90,
              "lines": 90,
              "statements": 90
            }
          },
          "coverageReporters": [
            "text"
          ]
      }

  * CI=true npm test -- --coverage - Run non interactive mode with coverage

  * npm install --save enzyme enzyme-adapter-react-16 react-test-renderer - Additional testing modules. Add this config in setupTest.js file

      import { configure } from 'enzyme';
      import Adapter from 'enzyme-adapter-react-16';

      configure({ adapter: new Adapter() });

  * 