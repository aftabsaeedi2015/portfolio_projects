const initialState = {
    userId: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserId':
            return { ...state, userId: action.payload };
        default:
            return state;
    }
}

export { userReducer };
