const users = {
    nombre: ''
};

const userReducer = (state = users, action) => {
    switch (action.type) {
        case 'SET_USER':
            state = {
                ...state,
                nombre: action.payload
            };
            break;
        case 'UNSET_USER':
            break;
        default:
            return state
    }
    return state
};

export default userReducer;