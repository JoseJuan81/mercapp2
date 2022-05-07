import { always, cond, curry, equals, T } from 'ramda';

export const roundPrices = curry((dec, val) => {

    const validating = cond([
        [equals(null), always(0)],
        [equals(undefined), always(0)],
        [equals([]), always(0)],
        [equals({}), always(0)],
        [() => isNaN(Number(val)), always(0)],
        [T, () => Number(val)]
    ])

    const validaded = validating(val);
    return Number( validaded.toFixed(dec) )
})

export const twoDecimals = roundPrices(2);
