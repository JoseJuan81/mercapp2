import { isEmpty } from 'functionallibrary';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { clearLocalStorage, setInLocalStorage } from '../helper/localStorage';
import { fetchCurrency, fetchLogin, fetchSignUp, fetchUser } from '../helper/fetch';
import toast, { NotificationInfo, NotificationSuccess } from '../helper/toast';

import { type } from '../constant/type';

import { endLoading, startLoading } from './loadingAction';

/// ============= Acciones sincronas ================= //
export const login = ( userData ) => ({
    type: type.auth.login,
    payload: userData
});

export const logout = () => ({
    type: type.auth.logout
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

        setInLocalStorage( type.localStorage.user, { ...userData, logged: true } );

    } catch (error) {

        console.error('error al iniciar sesion con google', error);
        
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => async dispatch => {

    const toastLoginId = toast.info( type.notificationMessages.login );
    dispatch( startLoading() );

    try {

        const response = await fetchLogin( email, password );

        if ( response.ok ) {

            const { data:user } = response;

            setInLocalStorage( type.localStorage.token, user.token );

            if ( isEmpty( user.currencies[0].code )) {

                const { code, symbol } = await fetchCurrency();
                user.currencies[0] = { code, symbol };
                fetchUser.update({ currencies: user.currencies });
            }
            
            dispatch( login( user ) );
            
            toast.dismiss( toastLoginId );
            toast.success( type.notificationMessages.welcome, { autoClose: 3000, delay: 500 });

        } else {
            console.error('error al iniciar sesion con correo', response.msg);
            toast.error('Error: ' + response.msg, { autoClose: false } );
            // enviar a pagina de error
        }
        
    } catch (error) {
        
        console.error('error al iniciar sesion con correo', error);
        toast.error('Error: ' + error, { autoClose: false } );
        // enviar a pagina de error

    } finally {
        setTimeout(() => {
            dispatch( endLoading() );
        }, 1000)
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

            setInLocalStorage( type.localStorage.user, { ...user, logged: true } );
            setInLocalStorage( type.localStorage.token, user.token );

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

    const toastLogoutId = toast.warning( type.notificationMessages.logout );

    dispatch( startLoading() );

    
    setTimeout(() => {
        
        clearLocalStorage();
        dispatch( logout() );
        dispatch( endLoading() );

    }, 2000);

    setTimeout(() => {

        toast.dismiss( toastLogoutId );
        NotificationInfo( type.notificationMessages.bye );

        const toastScoped = toast;
        setTimeout(() => {
            toastScoped.dismiss();
        }, 2000)

    }, 2000)
}