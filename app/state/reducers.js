const initialState = {
    userId: null,
    // this is to keep the ui up to date with the fresh data like when removing from favorites then the item in the homepage should change the heart color from blue to black
    informComponents: true

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setUserId':
            return { ...state, userId: action.payload };
        case 'changeInData':
            return {...state,changeInData: !state.changeInData}
        default:
            return state;

    }
}

export { userReducer };
