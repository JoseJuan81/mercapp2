import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { auth } from '../constant/auth';
import { clearLocalStorage, setInLocalStorage } from '../helper/localStorage';
import { typeLocal } from '../constant/localStorage';
import { fetchLogin, fetchSignUp } from '../helper/fetch';
import { endLoading, startLoading } from './loadingAction';

/// ============= Acciones sincronas ================= //
export const login = ( userData ) => ({
    type: auth.login,
    payload: userData
});

export const logout = () => ({
    type: auth.logout
});


/// ============= Acciones asincronas ================= //
export const startGoogleLogIn = () => async dispatch => {

    try {
        
        const { user } = await firebase.auth().signInWithPopup( googleAuthProvider );

        const userData = {
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            avatar: user.photoURL
        }

        dispatch(
            login( userData )
        )

        setInLocalStorage( typeLocal.user, { ...userData, logged: true } );

    } catch (error) {

        console.error('error al iniciar sesion con google', error);
        
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => async dispatch => {
    
    dispatch( startLoading() );

    try {

        const response = await fetchLogin( email, password );

        if ( response.ok ) {

            const { data:user } = response;
            const userData = {
                name: user.name,
                uid: user.uid,
                email: user.email,
                avatar: user.photoURL
            }
    
            dispatch( login( userData ) );
    
            setInLocalStorage( typeLocal.user, { ...userData, logged: true } );
            setInLocalStorage( typeLocal.token, user.token );

        } else {
            console.error('error al iniciar sesion con correo', response.msg);
        }

    } catch (error) {

        console.error('error al iniciar sesion con correo', error);

    } finally {
        dispatch( endLoading() );
    }
}

export const startRegisterWithNameEmailAndPassword = ({ name, email, password }) => async dispatch => {

    dispatch( startLoading() );
    try {

        const response = await fetchSignUp( name, email, password );

        if ( response.ok ) {

            const { data:user } = response;

            dispatch(
                login({
                    avatar: user.photoURL,
                    email: user.email,
                    name: user.name,
                    uid: user.uid,
                })
            )

            setInLocalStorage( typeLocal.user, { ...user, logged: true } );
            setInLocalStorage( typeLocal.token, user.token );

        } else {
            console.log( 'mostrar error del servicio', response.msg );
        }


    } catch (error) {
        
        console.error( 'error al registrar usuario', error );
    } finally {
        dispatch( endLoading() );
    }
}

export const appLogout = () => dispatch => {
    clearLocalStorage();
    dispatch( logout() );
}