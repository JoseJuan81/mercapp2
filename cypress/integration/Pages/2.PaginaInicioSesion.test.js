context('Pruebas sobre PaginaInicioSesion.js', () => {

    beforeEach(() => {

        cy.loginPage();

    })

    it('Verificar formulario para inicio de sesion', () => {

        // verificar existencia de 2 campos de texto
        cy.get('[data-cy="login-form"]')
            .should('exist')
            .find('input').should(( $input ) => {
                expect( $input ).to.have.length(2);
            })

        // verificar existencia de un boton de inicio de sesion
        cy.get('[data-cy="login-form"]')
            .should('exist')
            .find('button').should(( $button ) => {
                expect( $button ).to.have.length(1);
            })

        // verificar existencia del botton de google
        cy.get('[data-cy="login-form"]')
            .should('exist')
            .find('p').should(( $p ) => {
                expect( $p ).to.have.text( "Usa tu cuenta google" );
            })

        // verificar existencia del botton de etiqueta <a>
        cy.get('[data-cy="login-form"]')
            .should('exist')
            .find('a').should(( $a ) => {
                expect( $a ).to.have.length(1);
                expect( $a ).to.have.text('Registrarme')
            })
    })

    it('Iniciar sesion y ver pantalla Mis Compras', () => {

        cy.fillLoginForm();
        cy.fixture('mercapp2').then( ({ url }) => {

            cy.location().should(($location) => {

                expect( $location.href ).to.eq( url.misCompras )
            })
        })
    })
})