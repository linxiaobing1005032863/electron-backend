const initState = {
    shippingDraft: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SHIPPING_DRAFT':
            return {...state, shippingDraft: action.shippingDraft};
        default:
            return state;
    }
};

export default {initState, reducer};