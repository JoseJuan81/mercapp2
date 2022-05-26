import { isEmpty } from "functionallibrary";
import { always, cond, gt, T } from "ramda";

export const masonryGenerator = ( screenWidth, { columWidth, children, screenMaxWidth } ) => {
    
    const marginX = 20;
    const maxWidth = cond([
        [() => isEmpty(screenMaxWidth), always(screenWidth)],
        [() => gt( screenMaxWidth, screenWidth ), always(screenWidth)],
        [T, always(screenMaxWidth - marginX)]
    ]);

    const numCols = Math.floor( maxWidth() / columWidth );
    const container = [];

    for ( let i = 0; i < numCols; i += 1 ) {
        container.push([]);
    }

    children.forEach((child, ind) => {
        container[ind%numCols].push(child)
    })

    return [].concat( container );
}
