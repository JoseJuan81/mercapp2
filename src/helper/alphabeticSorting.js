export const alphabeticSorting = (arr) => {

    return arr.sort((a, b) => {
    
        if (a.title <= b.title) return -1;
    
        return 1;
    })

};