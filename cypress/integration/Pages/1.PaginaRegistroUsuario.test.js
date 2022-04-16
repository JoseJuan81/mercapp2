context('Pruebas sobre archivo PaginaRegistroUsuario.js', () => {
    
    it('Presionar boton "registrarme" para ir al formulario de registro', () => {
        // cy.loginPage();
        cy.get('[data-cy="login-form"]')
            .should('exist')
            .find('a')
            .click();

        cy.location('pathname').should('include', 'registro');
    })

    it('Verificar existan campos en formulario de registro', () => {

        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .should('have.class', 'animate__animated animate__rollIn')
                .find('input')
                .should('have.length', 4);
        })
    })

    it('Mostrar error cuando no existe nombre', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
            .find('button')
            .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('small')
                .eq(0)
                .should( ( $small ) => {
                    expect( $small ).to.have.text( 'El nombre es requerido ' )
                })

        })
    })

    it('Mostrar error cuando el nombre tiene menos de 4 caracteres', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Asd' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('small')
                .eq(0)
                .should( ( $small ) => {
                    expect( $small ).to.have.text( 'El nombre debe tener mas de 4 caracteres ' )
                })

        })
    })

    it('No Mostrar error cuando el nombre tiene al menos 4 caracteres', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Asda' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .children()
                .should('not.exist')

        })
    })

    it('Mostrar error cuando no hay correo', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;
                    expect( firstErr ).to.have.text('El correo es requerido ')
                })

        })
    })

    it('Mostrar error cuando el correo es invalido', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .type( 'josejuan@g' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;
                    expect( firstErr ).to.have.text('El correo es invalido ')
                })

        })
    })

    it('Correo valido', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .type( 'josejuan@mail.com' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .children()
                .should('not.exist')

        })
    })

    it('Error cuando no hay contrasena', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .type( 'josejuan@mail.com' );

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();
            
            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;

                    expect( firstErr ).to.have.text( 'La contrasena es requerida ' );
                })

        })
    })

    it('Error cuando la contrasena es menor a 6 caracteres y mayor a 16', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .type( 'josejuan@mail.com' );
            
            // menos de 4 caracteres en la contrasena
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(2)
                .type('12345');

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();

            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;

                    expect( firstErr ).to.have.text( 'La contrasena debe tener entre 6 y 16 caracteres ' );
                })

            // resetar campo de contrasena
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(2)
                .clear();

            // mas de 16 caracteres en la contrasena
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(2)
                .type('12345678910111213');

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();

            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;

                    expect( firstErr ).to.have.text( 'La contrasena debe tener entre 6 y 16 caracteres ' );
                })

        })
    })

    it('Contrasena valida', () => {
        cy.fixture('mercapp2').then(({ url }) => {

            cy.visit( url.signUp );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(0)
                .type( 'Jose Juan' );

            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(1)
                .type( 'josejuan@mail.com' );
            
            // menos de 4 caracteres en la contrasena
            cy.get('[data-cy="signup-form"]')
                .find('input')
                .eq(2)
                .type('123456');

            cy.get('[data-cy="signup-form"]')
                .find('button')
                .click();

            cy.get('[data-cy="signup-form"]')
                .find('small').then(($small) => {
                    const [firstErr] = $small;

                    expect( firstErr ).to.have.text( 'Las contrasenas no son iguales ' );
                })

        })
    })
})