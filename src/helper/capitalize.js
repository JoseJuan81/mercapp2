
export const capitalizeText = ( value ) => {

    const [first, ...rest] = value;

    const capitalizeName = `${ first.toUpperCase() }${ rest.join('') }`;
    return capitalizeName;

}
