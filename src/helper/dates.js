
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

const locale = window.navigator.language.includes('es') ? es : enUS;

export const getFormatDate = (date) => {
    return format( new Date( date ), 'd LLL yy' );
}

export const getDayInWord = ( date ) => {
    return format( new Date( date ), 'eeee', { locale })
}

export const formattedByInputDate = ( date ) => {

    if (date) {
        return date;
    }

    const current = new Date().toLocaleDateString().split('/');
    const year = current[2];
    const month = current[1].length === 2 ? current[1] : `0${current[1]}`;
    const day = current[0];
    return year + '-' + month + '-' + day;
}

export const dateWithTime = ( date ) => {

    const current = new Date();
    const h = current.getHours();
    const m = current.getMinutes();
    const s = current.getSeconds();

    const [y, month, d] = date.split('-');
    return new Date(y, month - 1, d, h, m, s);
}