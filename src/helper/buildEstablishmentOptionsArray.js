
export const buildEstablishmentOptionsArray = ( establishmentResponse ) => {

    return establishmentResponse.map( e => {
        const value = e.establishments;

        const [first, ...rest] = value;

        const capitalizeName = `${ first.toUpperCase() }${ rest.join('') }`;
        const label = capitalizeName;

        return {
            value,
            label
        }
    })
};