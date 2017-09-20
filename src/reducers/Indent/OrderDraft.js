const initState = {
    orderDraft: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'ORDER_DRAFT':
            return {...state, orderDraft: action.orderDraft};
        default:
            return state;
    }
};

export default {initState, reducer};