import { __, any, curry, filter, includes, pipe, prop, toLower } from 'ramda';

export const findElementsByLabelsMatch = curry(( cache, fil ) => {
    
    const data = filter(
        pipe(
            prop('labels'),
            any( pipe(toLower, includes(fil)) ),
        ),
        cache
    )
    return data;
})

export const findElementsByName = curry(( cache, s ) => {
    const data = filter(
        pipe(
            pipe( prop('name'), toLower ),
            includes( toLower( s ) ),
        ),
        cache
    )
    return data;
})
