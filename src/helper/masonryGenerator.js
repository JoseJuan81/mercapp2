
export const masonryGenerator = ( screenWidth, columWidth, items ) => {

    const numCols = Math.floor( screenWidth / columWidth );
    const itemsContainer = [];

    for ( let i = 0; i < numCols; i += 1 ) {
        itemsContainer.push([]);
    }

    items.forEach((item, ind) => {
        itemsContainer[ind%numCols].push(item)
    })

    return [].concat( itemsContainer );
}
