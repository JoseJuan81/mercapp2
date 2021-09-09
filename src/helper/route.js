
export const extractIdFromPathName = ( completePathname, pathname ) => {

    if ( completePathname.includes(pathname) ) {
        
        const idDirty = completePathname.replace( pathname, '');
        const [_,id] = idDirty.split('/');
    
        return id;
    }

    return false;
}