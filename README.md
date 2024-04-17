# Cypress Testing Project README

## Overview
This repository contains a Cypress testing project for testing web applications. Cypress is a modern end-to-end testing framework built for the modern web. This README provides an overview of the project, including installation instructions, how to run tests, project structure, and other relevant information.

## Installation
To install the project and its dependencies, follow these steps:
1. Clone the repository to your local machine:
   ```
   git clone https://github.com/S-ipk/Feefo.git
   ```
2. Navigate to the project directory:
   ```
   cd feefo
   ```
3. Install the dependencies using npm:
   ```
   npm install
   ```

## Running Tests
To run the tests, execute the following command in your terminal:
```
npm cypress open 
```
This will run the Cypress tests using the default Electron browser. To run tests in other browsers or with specific configurations, additional commands or configuration changes may be necessary.

## Project Structure
The project structure is as follows:
- `cypress/e2e`: Contains all the Cypress test files and configurations.
  - `fixtures`: Contains static data used by the tests.
  - `pages`: Uses page objecy model for maintainable , scaleable structure.
  - `support`: Contains reusable utility functions and custom commands used across tests.
- `node_modules`: Contains the installed npm packages.
- `package.json`: Contains the project metadata and dependencies.
- `README.md`: Contains the project documentation and information.

## Cypress Test Files
The Cypress test files are written using JavaScript and are located in the `cypress/e2e` directory. Each test file typically corresponds to a specific feature or functionality of the application being tested. The test files contain individual test cases or scenarios that verify the behavior of the application.

## Custom Commands and Utilities
The `cypress/support` directory contains custom commands and utility functions that can be reused across test files. These custom commands can help simplify test code and make it more readable. Utility functions can perform common tasks such as generating test data, interacting with the application under test, or making assertions.

## Continuous Integration with GitHub Actions
A GitHub Actions workflow file is included in the `.github/workflows` directory. This workflow file automates the execution of tests whenever changes are pushed to the repository. The workflow triggers Cypress tests on a specified environment and reports the results back to GitHub. This helps ensure that tests are run consistently and automatically, providing fast feedback to developers.


## TASK 2 AND TASK 3 CAN BE FOUND IN MY NOTION PAGE 
To access the notion page: 
https://www.notion.so/feefo-60acb1609ad641c89d5a0d1625e00a2a?pvs=4


