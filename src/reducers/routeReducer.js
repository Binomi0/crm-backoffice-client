const routeReducer = (state = { name: 'Home'}, action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            state = {
                ...state,
                name: action.payload
            };
            break;
        case 'NEW':
            break;
        default:
            return state
    }
    return state
};

export default routeReducer;