// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginPage', () => {

    cy.fixture('mercapp2').then(({ url }) => {

        cy.visit( url.login );
    })
})

Cypress.Commands.add('insumosPage', () => {

    cy.fixture('mercapp2').then(({ url }) => {

        cy.visit( url.insumos );
    })
})

Cypress.Commands.add('fillLoginForm', () => {

    cy.fixture('mercapp2').then(({ email, password }) => {
        cy.get('[data-cy="login-email"]')
            .should('exist')
            .type( email );

        cy.get('[data-cy="login-password"]')
            .should('exist')
            .type( password );

        cy.get('[data-cy="login-button"]')
            .should('exist')
            .click();
    })
})