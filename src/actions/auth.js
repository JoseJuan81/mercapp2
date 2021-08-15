import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { auth } from '../constant/auth';

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

        dispatch(
            login({
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                avatar: user.photoURL
            })
        )

    } catch (error) {

        console.error('error al iniciar sesion', error);
        
    }
}