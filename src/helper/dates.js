
import { timeFormat } from 'd3';
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

export const dataListFormatDate = date => timeFormat("%Y-%m-%d")(date);
