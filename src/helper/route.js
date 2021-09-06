
export const extractIdFromPathName = ( completePathname, pathname ) => {
    const idDirty = completePathname.replace( pathname, '');
    const [_,id] = idDirty.split('/');

    return id;
}