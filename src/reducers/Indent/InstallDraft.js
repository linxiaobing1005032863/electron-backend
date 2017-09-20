const initState = {
    installDraft: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'INSTALL_DRAFT':
            return {...state, installDraft: action.installDraft};
        default:
            return state;
    }
};

export default {initState, reducer};