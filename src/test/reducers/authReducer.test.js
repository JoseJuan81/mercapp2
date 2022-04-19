import { type } from "../../constant/type";
import { authReducer, initialState } from "../../reducers/authReducer"

describe('Pruebas en archivo authReducer.js', () => {

    const userData = {
        name: 'JJ',
        uid: '1q2w3e4r5t6y',
        email: 'jj@mail.com',
        avatar: 'www.miavatar.com'
    }
    
    test('Retornar estado inicial', () => {
        
        const state = authReducer( initialState, {} );

        expect( state ).toEqual( initialState );
    })

    test('Probando el Login', () => {
        
        const loginAction = {
            type: type.auth.login,
            payload: userData
        }
        const state = authReducer( initialState, loginAction );

        expect( state ).toEqual( { ...userData, logged: true } );
    })

    test('Probando el Logout', () => {
        
        const loginAction = {
            type: type.auth.logout
        }
        const state = authReducer( initialState, loginAction );

        expect( state ).toEqual( { logged: false } );
    })
})