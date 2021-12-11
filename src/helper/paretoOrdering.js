import { round, setNewProperty, compose } from "functionallibrary";

const TWODECIMALS = round( 2 );

export const paretoOrdering = ( items, { prop, total } ) => {

    const descendingItems = items.sort( (a, b) => b[prop] - a[prop] );

    const newItems = descendingItems.reduce((acc, item, index) => {

        const weight = TWODECIMALS( item.total / total  * 100 );
        let weightAcc = 0;

        if ( index === 0 ) {
            weightAcc = weight;
        } else {

            const lastWeightAcc = acc[index - 1].weightAcc;
            weightAcc = TWODECIMALS( lastWeightAcc + weight )
        }
    
        return acc.concat(
            compose(
                setNewProperty('weightAcc', weightAcc),
                setNewProperty('weight', weight),
            )(item)
        )
    }, [])
        
    return newItems;

}