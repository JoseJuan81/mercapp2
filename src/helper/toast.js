import { toast } from 'react-toastify';

export const NotificationError = ( msg ) => {
    toast.error( msg, { autoClose: false, theme: 'colored' } );
}

export const NotificationSuccess = ( msg ) => {
    toast.success( msg, { theme: 'colored' } );
}

export const NotificationInfo = ( msg ) => {
    toast.info( msg, { autoClose: false, theme: 'colored' } );
}

export default toast;