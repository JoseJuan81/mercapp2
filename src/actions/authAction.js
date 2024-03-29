import { isEmpty } from 'functionallibrary';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { clearLocalStorage, setInLocalStorage } from '../helper/localStorage';
import { fetchCurrency } from '../helper/fetch';
import toast, { NotificationInfo } from '../helper/toast';
import { fetchLogin } from '../helper/fetch/fetchLogin';
import { fetchSignUp } from '../helper/fetch/fetchSignUp';
import { fetchUser } from '../helper/fetch/fetchUser';

import { type } from '../constant/type';

import { endLoading, startLoading } from './loadingAction';
import { resetUserState, updateUserData } from './userAction';

/// ============= Acciones sincronas ================= //
export const login = () => ({
    type: type.auth.login
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

        const response = await fetchLogin.login( email, password );

        if ( response.ok ) {

            const { data:userResponse } = response;

            setInLocalStorage( type.localStorage.token, userResponse.token );
            setInLocalStorage( type.localStorage.user, { logged: true } );
            dispatch( login() );
            
            if ( isEmpty( userResponse.currencies ) || isEmpty( userResponse.currencies[0].code )) {
                
                const { code, symbol } = await fetchCurrency();
                userResponse.currencies[0] = { code, symbol };
                fetchUser.update({ currencies: userResponse.currencies });
            }

            const { token, uid, id, ...restUserData } = userResponse;
            dispatch( updateUserData( restUserData ) );

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

        const { code, symbol } = await fetchCurrency();
        const currencies = { code, symbol };
        const response = await fetchSignUp.new( name, email, password, currencies );

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

    clearLocalStorage();
    
    setTimeout(() => {
        
        dispatch( logout() );
        // dispatch( resetUserState() );
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