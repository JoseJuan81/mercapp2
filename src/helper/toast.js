import { toast } from 'react-toastify';

export const NotificationError = ( msg ) => {
    toast.error( msg, { autoClose: false } );
}

export const NotificationSuccess = ( msg ) => {
    toast.success( msg );
}

export default toast;