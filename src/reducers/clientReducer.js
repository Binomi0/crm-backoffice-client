const clientReducer = (state = 0, action) => {
    switch (action.type) {
        case 'NEW_CLIENT':
            break;
        case 'UPDATE_CLIENT':
            break;
        default:
            return state
    }
    return state
};

export default clientReducer;