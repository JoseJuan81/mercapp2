
export const orderingPurchases = ( list ) => {
    const purchases = list.reduce( ( acc, item ) => {

        const { closed } = item;
        const position = closed ? 1 : 0;
        
        acc[position].push( item )
        return acc;
        
    }, [[], []]);

    return [...purchases[0], ...purchases[1]];
}
