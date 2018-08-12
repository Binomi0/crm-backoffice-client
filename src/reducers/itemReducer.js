 const itemReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            break;
        case 'UNSET_ITEM':
            break;
        default:
            return state
    }
    return state
};
export default itemReducer;