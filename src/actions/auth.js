import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { auth } from '../constant/auth';
import { removeFromLocalStorage, setInLocalStorage } from '../helper/localStorage';
import { userKey } from '../constant/user';

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

        setInLocalStorage( userKey, { ...userData, logged: true } );

    } catch (error) {

        console.error('error al iniciar sesion con google', error);
        
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => async dispatch => {

    try {

        const { user } = await firebase.auth().signInWithEmailAndPassword( email, password );

        const userData = {
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            avatar: user.photoURL
        }

        dispatch(
            login( userData )
        )

        setInLocalStorage( userKey, { ...userData, logged: true } );

    } catch (error) {
        console.error('error al iniciar sesion con correo', error);
    }
}

export const startRegisterWithNameEmailAndPassword = ({ name, email, password }) => async dispatch => {

    try {
        
        const { user } = await firebase.auth().createUserWithEmailAndPassword( email, password );
        await user.updateProfile({ displayName: name });

        dispatch(
            login({
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                avatar: user.photoURL
            })
        )

    } catch (error) {
        
        console.error( 'error al registrar usuario', error );
    }
}

export const appLogout = () => dispatch => {
    removeFromLocalStorage( userKey );
    dispatch( logout() );
}