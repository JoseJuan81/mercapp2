context('Pruebas sobre archivo PaginaInsumos.js', () => {
    
    it('Verificar que esta sea la pagina de insumos', () => {

        cy.loginPage();
        cy.fillLoginForm();
        cy.insumosPage();
        cy.location('pathname').should('include', 'mis-insumos');

    })

    it('Sin insumos: Se debe mostrar boton para crear insumos', () => {

        cy.fixture('mercapp2.json').then( ({ insumos }) => {

            cy.intercept('GET', '**/insumos', insumos.noData ).as('fake-insumos')

            cy.loginPage();
            cy.fillLoginForm();
            // aqui problema
            cy.wait(1000)
            cy.insumosPage();

            cy.wait('@fake-insumos')
                .its('response.body')
                .should('exist');

            cy.get('[data-cy="BigAddButton"]')
                .should('exist')
        })
    })

    it('Con insumos: Se deben mostrar los insumos', () => {
        
        cy.fixture('mercapp2.json').then( ({ insumos }) => {

            cy.intercept('GET', '**/insumos', insumos.data).as('fake-insumos')
    
            cy.loginPage();
            cy.fillLoginForm();
            cy.insumosPage();
    
            cy.wait('@fake-insumos')
                .its('response.body')
                .should('exist');
    
            cy.get('[data-cy="PaginaInsumos"]')
                .should('exist')
        })
    })

})