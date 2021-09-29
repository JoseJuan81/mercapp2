export const alphabeticSorting = (arr, prop) => {

    return arr.sort((a, b) => {
    
        if (a[prop] <= b[prop]) return -1;
    
        return 1;
    })

};