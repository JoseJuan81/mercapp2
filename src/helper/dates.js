
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

const locale = window.navigator.language.includes('es') ? es : enUS;

export const getFormatDate = (date) => {
    return format( new Date( date ), 'd LLL yy' );
}

export const getDayInWord = ( date ) => {
    return format( new Date( date ), 'eeee', { locale })
}