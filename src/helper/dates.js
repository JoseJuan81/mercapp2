
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { upperFirst } from 'lodash';

const locale = window.navigator.language.includes('es') ? es : enUS;

export const getFormatDate = (date, formatting = 'd LLL yy' ) => {

    if ( !date ) return;
    
    return format( new Date( date ), formatting, { locale } );
}

export const getDayInWord = ( date ) => {
    return upperFirst( format( new Date( date ), 'eeee', { locale }) );
}

export const getMonthInWord = ( date ) => {
    return upperFirst( format( new Date( date ), 'LLLL Y', { locale }) );
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

export const absDate = ( date ) => {

    const isAbsDate = date.includes("T");

    if ( isAbsDate ) {
        return new Date( date );
    }
    const now = new Date();
    const hr = now.getHours();
    const min = now.getMinutes();
    const seg = now.getSeconds();
    const mili = now.getMilliseconds();

    const [y, month, d] = date.split('-');
    return new Date(y, month - 1, d, hr, min, seg, mili);
}