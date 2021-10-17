context('Pruebas sobre archivo PaginaInsumos.js', () => {
    
    it('Verificar que esta sea la pagina de insumos', () => {

        cy.loginPage();
        cy.fillLoginForm();
        cy.insumosPage();
        cy.location('pathname').should('include', 'mis-insumos');

    })

    it('Verificar exista MisInsumosContainer', () => {

        cy.loginPage();
        cy.fillLoginForm();
        cy.insumosPage();

        cy.get('[data-cy="MisInsumosContainer"')
            .should('exist')
            .children().should('have.length', 3)
    })

    // it.only('Interceptar request', () => {
        
    //     cy.intercept('GET', '**/insumos', []).as('fake-insumos')

    //     cy.loginPage();
    //     cy.fillLoginForm();
    //     cy.insumosPage();

    //     cy.wait('@fake-insumos')
    //         .its('response.body')
    //         .should('exist')
    // })

})