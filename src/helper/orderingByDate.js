

export const orderingAscByDate = ( items = [] ) => {
    return items.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    })
}
